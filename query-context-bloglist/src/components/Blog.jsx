import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useError, useNotificate } from '../NotificationContext'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useUserValue } from '../UserContext'

const Blog = ({ blog }) => {
    const queryClient =  useQueryClient()
    const notificationDispatch = useNotificate()
    const errorDispatch = useError()

    const [showDetails, setShowDetails] = useState(false)

    const storedUser = useUserValue()
    const username = storedUser ? storedUser.username : ''

    const showDeleteButton = blog.user.username === username ? true : false

    const hideWhenVisible = { display: showDetails ? 'none' : '' }
    const shownWhenVisible = { display: showDetails ? '' : 'none' }

    const addLikeMutation = useMutation({
        mutationFn: ({ id, likedBlog }) => blogService.addLike(id, likedBlog),
        onSuccess: (updatedBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
            notificationDispatch(`you liked ${updatedBlog.title}`, 5)
        },
        onError: (err) => {
            errorDispatch(err.message, 5)
        }
    })

    const removeMutation = useMutation({
        mutationFn: blogService.removeBlog,
        onSuccess: () => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== blog.id))
            notificationDispatch(`you removed ${blog.title}`, 5)
        },
        onError: (err) => {
            errorDispatch(err.message, 5)
        }
    })

    const addLike = () => {
        const likedBlog = {
            ...blog,
            likes: (blog.likes || 0) + 1,
        }

        addLikeMutation.mutate({ id: blog.id, likedBlog })
    }

    const removeBlog = () => {
        if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
            removeMutation.mutate(blog.id)
        }
    }

    return (
        <tr>
            <td className='blogName'>{blog.title}</td>
            <td className='blogAuthor'>{blog.author}</td>
            <td>
                <div style={hideWhenVisible}>
                    <button className='btn btn-outline-secondary btn-block' id="view-button" onClick={() => setShowDetails(true)}>view</button>
                </div>
                <div style={shownWhenVisible} className="card blogDetails">
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">Author: {blog.author}</p>
                        <p className="card-text">URL: <a href={blog.url}>{blog.url}</a></p>
                        <p className="card-text" id="likes-count">Likes: {blog.likes}</p>
                        <p className="card-text">created by: {blog.user.name}</p>
                        <div className='d-flex justify-content-center text-center gap-2'>
                            <button className='btn btn-outline-secondary' onClick={() => setShowDetails(false)}>hide</button>
                            <button className='btn btn-outline-secondary' id="like-button" onClick={addLike}>like</button>
                            {showDeleteButton && <button className='btn btn-outline-secondary' id="delete-button" onClick={removeBlog}>remove</button>}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

const Blogs = () => {
    const blogsQuery = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        retry: false
    })

    const blogs = blogsQuery.data

    if (blogsQuery.isLoading || blogsQuery.isError) {
        return <div>blogs are not available due to problems in server</div>
    }

    return (
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
    )
}



export default Blogs