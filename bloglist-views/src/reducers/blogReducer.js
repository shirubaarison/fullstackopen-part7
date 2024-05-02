import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setError, setNotification } from './notificationReducer'

const blogsReducer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        deleteBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload)
        },
        increaseLike(state, action) {
            return state.map((blog) =>
                blog.id === action.payload
                    ? { ...blog, likes: (blog.likes || 0) + 1 }
                    : blog
            )
        },
        sortByLikes(state, action) {
            return state.sort((a, b) => b.likes - a.likes)
        },
    },
})

export const { setBlogs, appendBlog, deleteBlog, increaseLike, sortByLikes } =
    blogsReducer.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
        dispatch(sortByLikes())
    }
}

export const addBlog = (obj) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.createBlog(obj)
            dispatch(appendBlog(newBlog))
            dispatch(
                setNotification(
                    `a new blog ${newBlog.title} by ${newBlog.author} added`,
                    5
                )
            )
        } catch (err) {
            dispatch(setError(err.response.data.error, 5))
        }
    }
}

export const removeBlog = (title, id) => {
    return async (dispatch) => {
        try {
            await blogService.removeBlog(id)
            dispatch(deleteBlog(id))
            dispatch(setNotification(`you removed ${title}`, 5))
            dispatch(sortByLikes())
        } catch (err) {
            dispatch(setError(err.response.data.error, 5))
        }
    }
}

export const addLike = (obj, id) => {
    return async (dispatch) => {
        try {
            const response = await blogService.addLike(id, obj)
            dispatch(increaseLike(id))
            dispatch(setNotification(`you liked ${response.title}`, 5))
            dispatch(sortByLikes())
        } catch (err) {
            dispatch(setError(err.response.data.error, 5))
        }
    }
}

export const getBlogs = (state) => state.blogs

export default blogsReducer.reducer
