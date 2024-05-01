import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, setError } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser, initializeUser, logout } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(getUser)

    useEffect(() => {
        dispatch(initializeUser())
        dispatch(initializeBlogs())
    }, [dispatch])

    const handleLogout = () => {
        dispatch(logout())
    }

    if (user) {
        return (
            <div>
                <div className="p-5 mb-3 bg-primary text-white">
                    <h2>Blogs</h2>
                </div>
                <div className="p-5">
                    <Notification />
                    <div className="container">
                        <div className="row justify-content-end">
                            <div className="col-auto">
                                <p>
                                    {user.name} logged in{' '}
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleLogout}
                                    >
                                        logout
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <BlogForm />
                    </div>
                    <div className="container mt-5">
                        <Blogs />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Notification />
                <LoginForm />
            </div>
        )
    }
}

export default App
