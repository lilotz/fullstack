import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'


test('a new blog is added correctly', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }


  const addBlog = vi.fn()

  render(<NewBlogForm addBlog={addBlog} />)

  const title = screen.getByLabelText('title:')
  const author = screen.getByLabelText('author:')
  const url = screen.getByLabelText('url:')

  const createButton = screen.getByText('create')

  await userEvent.type(title, newBlog.title)
  await userEvent.type(author, newBlog.author)
  await userEvent.type(url, newBlog.url)

  await userEvent.click(createButton)


  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(addBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(addBlog.mock.calls[0][0].url).toBe(newBlog.url)
})