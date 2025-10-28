import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import UpdateNotification from './components/UpdateNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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

  const createNewBlog = async (blogObject) => {  
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))

      setUpdateMessage(`a new blog "${blogObject.title}" by ${blogObject.author} added`)
    }
    catch {
      setErrorMessage("title, author or url missing")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const blogFormRef = useRef()

  const createNewBlogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <NewBlogForm
            addBlog={createNewBlog}
          />
        </Togglable>
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

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
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