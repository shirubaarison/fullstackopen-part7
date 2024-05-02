import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
    const notification = useNotificationValue()

    if (!notification) return null

    if (notification.error) {
        return (
            <div className='notification error alert alert-danger'>
                {notification.notification}
            </div>
        )
    }

    return (
        <div className='notification alert alert-success'>
            {notification.notification}
        </div>
    )
}
export default Notification