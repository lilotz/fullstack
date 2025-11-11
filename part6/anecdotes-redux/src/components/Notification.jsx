import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const notification = useSelector(state => state.notification)

  const showWhenVisible = { display: notification === '' ? 'none' : '' }

  return (
    <div style={showWhenVisible}>
      <div style={style}>{notification}</div>
    </div>)
}

export default Notification
