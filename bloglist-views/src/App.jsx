import { useEffect } from 'react'
import Blogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser, initializeUser, logout } from './reducers/userReducer'

import { Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import Users from './components/Users'

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
                <Menu />
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
                    <Routes>
                        <Route path='/*' element={<Blogs />} />
                        <Route path='/users/*' element={<Users />} />
                    </Routes>
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
