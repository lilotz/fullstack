import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const user = blog.user

  return (
    <div>
      <div style={hideWhenVisible} >
        <div className='blog'>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div className='blog'>
          <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>{user.name}</p>
        </div>
      </div>
    </div >
  )
}

export default Blog