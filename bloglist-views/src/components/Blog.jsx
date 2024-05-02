import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs, removeBlog, addLike } from '../reducers/blogReducer'
import { getUser } from '../reducers/userReducer'
import { Link, Route, Routes, redirect, useMatch } from 'react-router-dom'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const [showDetails, setShowDetails] = useState(false)

    const storedUser = useSelector(getUser)

    const username = storedUser ? storedUser.username : ''
    const showDeleteButton = blog.user.username === username ? true : false

    const hideWhenVisible = { display: showDetails ? 'none' : '' }
    const shownWhenVisible = { display: showDetails ? '' : 'none' }

    const like = () => {
        const changedObj = {
            ...blog,
            likes: (blog.likes || 0) + 1,
        }
        dispatch(addLike(changedObj, blog.id))
    }

    const remove = () => {
        if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(removeBlog(blog.title, blog.id))
        }
    }

    return (
        <tr>
            <td className="blogName"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
            <td className="blogAuthor">{blog.author}</td>
            <td>
                <div style={hideWhenVisible}>
                    <button
                        className="btn btn-outline-secondary btn-block"
                        id="view-button"
                        onClick={() => setShowDetails(true)}
                    >
                        view
                    </button>
                </div>
                <div style={shownWhenVisible} className="card blogDetails">
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">Author: {blog.author}</p>
                        <p className="card-text">
                            URL: <a href={blog.url}>{blog.url}</a>
                        </p>
                        <p className="card-text" id="likes-count">
                            Likes: {blog.likes}
                        </p>
                        <p className="card-text">
                            created by: {blog.user.name}
                        </p>
                        <div className="d-flex justify-content-center text-center gap-2">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => setShowDetails(false)}
                            >
                                hide
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                                id="like-button"
                                onClick={like}
                            >
                                like
                            </button>
                            {showDeleteButton && (
                                <button
                                    className="btn btn-outline-secondary"
                                    id="delete-button"
                                    onClick={remove}
                                >
                                    remove
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

const BlogView = ({ blog }) => {
    const dispatch = useDispatch()

    const like = () => {
        const changedObj = {
            ...blog,
            likes: (blog.likes || 0) + 1,
        }
        dispatch(addLike(changedObj, blog.id))
    }

    if (!blog) return null

    return (
        <div className='container'>
            <h1>{blog.title}</h1>
            <br></br>
            <h4>author: {blog.author}</h4>
            <h4>likes: {blog.likes}</h4>
            <h4><a href={blog.url}>{blog.url}</a></h4>
            <h5>added by {blog.user.username}</h5>
            <button
                className="btn btn-outline-secondary"
                id="like-button"
                onClick={like}
            >
                like
            </button>
            <br></br>
        </div>
    )
}


const Blogs = () => {
    const blogs = useSelector(getBlogs)

    const match = useMatch('/blogs/:id')

    const blog = match ? blogs.find(b => b.id === match.params.id) : null

    return (
        <Routes>
            <Route path='/' element={
                <div className="container mt-5">
                    <table className="table" id="blog-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <Blog key={blog.id} blog={blog} />
                            ))}
                        </tbody>
                    </table>
                </div>} />
            <Route path='/blogs/:id' element={<BlogView blog={blog} />} />
        </Routes>
    )
}

export default Blogs
