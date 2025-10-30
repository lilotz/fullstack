import { useState } from 'react'

const Blog = ({
  blog,
  handleLikeChange,
  removeBlog,
  user
}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogUser = blog.user

  const showWhenUser = { display: blogUser.username.toString() === user.username.toString() ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const newLike = () => {
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }
    handleLikeChange(updatedBlog)
  }

  const handleDelete = () => {
    if (confirm(`Remove Blog "${blog.title}" by ${blog.author}?`)) {
      removeBlog(blog)
    }
  }

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
          <p>likes {blog.likes} <button onClick={newLike}>like</button></p>
          <p>{blogUser.name}</p>
          <div style={showWhenUser}>
            <p><button onClick={handleDelete}>remove</button></p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Blog