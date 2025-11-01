import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only author and titlet', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'Lisa',
      name: 'Lisa',
      id: '6900f9868a4edf503594c6e0'
    },
  }

  const user = {
    username: 'Lisa'
  }

  render(<Blog blog={blog} user={user} />)

  const title = screen.findByText('React patterns')
  expect(title).toBeDefined()
  const author = screen.findByText('Michael Chan')
  expect(author).toBeDefined()
  const url = screen.getByText('https://reactpatterns.com/')
  expect(url).not.toBeVisible()
  const likes = screen.getByText('likes 7')
  expect(likes).not.toBeVisible()
  const username = screen.queryByText('Lisa')
  expect(username).not.toBeVisible()
})

test('renders url, likes, and username after clicking button', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'Lisa',
      name: 'Lisa',
      id: '12345'
    },
  }

  const user = {
    username: 'Lisa'
  }

  render(<Blog blog={blog} user={user} />)

  const event = userEvent.setup()
  const button = screen.getByText('view')

  await event.click(button)

  const title = screen.findByText('React patterns')
  expect(title).toBeDefined()
  const author = screen.findByText('Michael Chan')
  expect(author).toBeDefined()
  const url = screen.getByText('https://reactpatterns.com/')
  expect(url).toBeVisible()
  const likes = screen.getByText('likes 7')
  expect(likes).toBeVisible()
  const username = screen.getByText('Lisa')
  expect(username).toBeVisible()
})

test('like is clicked twice', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'Lisa',
      name: 'Lisa',
      id: '6900f9868a4edf503594c6e0'
    },
  }

  const user = {
    username: 'Lisa'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={user} handleLikeChange={mockHandler} />)

  const event = userEvent.setup()
  const button = screen.getByText('like')

  await event.click(button)
  await event.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})