import { useState } from 'react'

const NewBlogForm = ({
  addBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={createNewBlog}>
        <div>
          <label>
            title: &nbsp;
            <input
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author: &nbsp;
            <input
              type="text"
              value={author}
              onChange={event => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url: &nbsp;
            <input
              type="text"
              value={url}
              onChange={event => setURL(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm