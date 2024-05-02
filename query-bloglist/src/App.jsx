import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'
import { useError, useNotificate } from './NotificationContext'

const App = () => {
    const notificationDispatch = useNotificate()
    const errorDispatch = useError()
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const handleLogin = async (loginObj) => {
        try {
            const user = await loginService.login(loginObj)

            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            notificationDispatch('sucess log in', 5)
        } catch (exception) {
            errorDispatch('wrong username or password', 5)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        setUser(null)
        notificationDispatch('logged out', 5)

    }

    const addBlog = async (blogObj) => {
        try {
            const response = await blogService.createBlog(blogObj)
            setBlogs(blogs.concat(response))
            notificationDispatch(`a new blog ${blogObj.title} by ${blogObj.author} added`, 5)

            blogFormRef.current.toggleVisibility()

        } catch (err) {
            errorDispatch(err.message, 5)
        }
    }

    const addLike = async (id) => {
        const blog = blogs.find(b => b.id === id)
        const changedBlog = { ...blog, likes: (blog.likes === null ? 1 : blog.likes + 1) }

        try {
            const response = await blogService.addLike(id, changedBlog)
            const newBlogs = blogs.map(b => b.id !== id ? b : response)
            const sortedBlogs = [...newBlogs].sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)

            notificationDispatch(`you liked ${blog.title}`, 5)
        } catch (err) {
            errorDispatch(err.message, 5)
        }
    }

    const removeBlog = async (id) => {
        const blog = blogs.find(b => b.id === id)

        if (window.confirm(`remove blog ${blog.title} by ${blog.author}`))
            try {
                await blogService.removeBlog(id)

                setBlogs(blogs.filter(b => b.id !== id))

                notificationDispatch(`you removed ${blog.title}`, 5)
            } catch (err) {
                errorDispatch(err.message, 5)
            }
    }

    if (user) {
        return (
            <div>
                <div className='p-5 mb-3 bg-primary text-white'><h2>Blogs</h2></div>
                <div className='p-5'>
                    <Notification />
                    <div className='container'>
                        <div className="row justify-content-end">
                            <div className='col-auto'>
                                <p>{user.name} logged in <button className='btn btn-primary' onClick={handleLogout}>logout</button></p>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <Togglable buttonLabel='new blog' secondButtonLabel='cancel' ref={blogFormRef}>
                            <BlogForm createBlog={addBlog} />
                        </Togglable>
                    </div>
                    <div className='container mt-5'>
                        <table className='table' id="blog-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map(blog =>
                                    <Blog key={blog.id} blog={blog} addLike={() => addLike(blog.id)} removeBlog={() => removeBlog(blog.id)}/>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <Notification />
                <LoginForm handleLogin={handleLogin} />
            </div>
        )
    }
}

export default App