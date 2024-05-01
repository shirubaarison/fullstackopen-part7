import { createSlice } from '@reduxjs/toolkit'
import { setError, setNotification } from './notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
    name: 'users',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        reset(state, action) {
            return null
        },
    },
})

export const { setUser, reset } = userSlice.actions

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        console.log(loggedUserJSON)
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            await blogService.setToken(user.token)
            dispatch(setUser(user))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBloglistUser')
        dispatch(reset())
        dispatch(setNotification('logged out', 5))
    }
}

export const login = (obj) => {
    return async (dispatch) => {
        try {
            const response = await loginService.login(obj)
            window.localStorage.setItem(
                'loggedBloglistUser',
                JSON.stringify(response)
            )
            await blogService.setToken(response.token)

            dispatch(setUser(response))
            dispatch(setNotification('sucess log in', 5))
        } catch (err) {
            dispatch(setError('wrong username or password', 5))
        }
    }
}

export const getUser = (state) => state.user

export default userSlice.reducer
