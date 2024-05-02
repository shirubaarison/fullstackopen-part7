import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch(action.type) {
    case 'NOTIFY':
        return { notification: action.payload, error: false }
    case 'RESET':
        return null
    case 'ERROR':
        return { notification: action.payload, error: true }
    default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    const notificate = (text, time) => {
        notificationDispatch({ type: 'NOTIFY', payload: text })
        setTimeout(() => {
            notificationDispatch({ type: 'RESET' })
        }, time * 1000)
    }

    const error = (text, time) => {
        notificationDispatch({ type: 'ERROR', payload: text })
        setTimeout(() => {
            notificationDispatch({ type: 'RESET' })
        }, time * 1000)
    }

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch, notificate, error]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificate = useContext(NotificationContext)
    return notificate[0]
}

export const useNotificate = () => {
    const notificate = useContext(NotificationContext)
    return notificate[2]
}

export const useError = () => {
    const notificate = useContext(NotificationContext)
    return notificate[3]
}

export default NotificationContext