import { useState } from 'react'

const Blog = ({
  blog,
  handleLikeChange
}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const newLike = () => {
    console.log(blog)
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes+1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }
    console.log(updatedBlog)
    handleLikeChange(updatedBlog)
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
          <p>likes {blog.likes} <button onClick={newLike}>like</button></p>
          <p>{user.name}</p>
        </div>
      </div>
    </div >
  )
}

export default Blog