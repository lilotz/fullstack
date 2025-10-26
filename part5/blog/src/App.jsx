import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import UpdateNotification from './components/UpdateNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [updateMessage, setUpdateMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage("wrong username or password")

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createNewBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })

      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setURL('')

      setUpdateMessage(`a new blog "${title}" by ${author} added`)
    }
    catch  {
      setErrorMessage("title, author or url missing")

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username &nbsp;
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password &nbsp;
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>)
  }

  const createNewBlogForm = () => {
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
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author: &nbsp;
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url: &nbsp;
              <input
                type="text"
                value={url}
                onChange={({ target }) => setURL(target.value)}
              />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  const blogsForm = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <UpdateNotification message={updateMessage} />
      <ErrorNotification message={errorMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in &nbsp;
            <button type="button" onClick={handleLogout}>logout</button>
          </p>
          {createNewBlogForm()}
          {blogsForm()}
        </div>
      )}
    </div>
  )
}

export default App