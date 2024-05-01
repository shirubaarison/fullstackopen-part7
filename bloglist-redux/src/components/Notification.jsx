import { useSelector } from 'react-redux'
import { getError, getNotification } from '../reducers/notificationReducer'

const Notification = () => {
    const notification = useSelector(getNotification)
    const error = useSelector(getError)

    if (!notification && !error) return null

    if (error)
        return (
            <div className="notification error alert alert-danger">{error}</div>
        )

    return (
        <div className="notification alert alert-success">{notification}</div>
    )
}
export default Notification
