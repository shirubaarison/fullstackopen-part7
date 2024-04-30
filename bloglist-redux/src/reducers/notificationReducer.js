import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notificate(state, action) {
            return { notification: action.payload }
        },
        error(state, action) {
            return { error: action.payload }
        },
        reset() {
            return null
        },
    },
})

export const { notificate, error, reset } = notificationSlice.actions

export const setNotification = (text, time) => {
    return async (dispatch) => {
        dispatch(notificate(text))

        setTimeout(() => {
            dispatch(reset())
        }, time * 1000)
    }
}

export const setError = (text, time) => {
    return async (dispatch) => {
        dispatch(error(text))

        setTimeout(() => {
            dispatch(reset())
        }, time * 1000)
    }
}

export const getNotification = state => state.notification ? state.notification.notification : null
export const getError = state => state.notification ? state.notification.error : null


export default notificationSlice.reducer
