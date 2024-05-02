import { createContext, useReducer, useContext, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { useError, useNotificate } from './NotificationContext'

const userReducer = (state, action) => {
    switch(action.type) {
    case 'LOGIN':
        return action.payload
    case 'LOGOUT':
        return null
    default:
        return state
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    const notificationDispatch = useNotificate()
    const errorDispatch = useError()

    useEffect(() => {
        const checkLoggedUser = async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)
                userDispatch({ type: 'LOGIN', payload: user })
                blogService.setToken(user.token)
            }
        }

        checkLoggedUser()
    }, [])

    const login = async (loginObj) => {
        try {
            const user = await loginService.login(loginObj)
            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(user)
            )
            userDispatch({ type: 'LOGIN', payload: user })
            blogService.setToken(user.token)
            notificationDispatch('sucess log in', 5)
        } catch (err) {
            errorDispatch('wrong username or password', 5)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        userDispatch({ type: 'LOGOUT' })
        notificationDispatch('logged out', 5)
    }

    return (
        <UserContext.Provider value={[user, userDispatch, login, logout]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserValue = () => {
    const user = useContext(UserContext)
    return user[0]
}

export const useUserDispatch = () => {
    const user = useContext(UserContext)
    return user[2]
}

export const useCheckLoggedUser = () => {
    const user = useContext(UserContext)
    return user[2]
}

export const useLogin = () => {
    const user = useContext(UserContext)
    return user[2]
}

export const useLogout = () => {
    const user = useContext(UserContext)
    return user[3]
}

export default UserContext