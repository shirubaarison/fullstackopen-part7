import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import { useError, useNotificate } from '../NotificationContext'

import Togglable from './Togglable'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const blogFormRef = useRef()

    const notificationDispatch = useNotificate()
    const errorDispatch = useError()

    const queryClient = useQueryClient()

    const createBlogMutation = useMutation({
        mutationFn: blogService.createBlog,
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
            notificationDispatch(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5)
        },
        onError: (err) => {
            errorDispatch(err.response.data.error, 5)
        }
    })

    const addBlog = (event) => {
        event.preventDefault()

        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        setTitle('')
        setAuthor('')
        setUrl('')

        createBlogMutation.mutate(newBlog)
        blogFormRef.current.toggleVisibility()
    }
    return (
        <Togglable buttonLabel="new blog" secondButtonLabel="cancel" ref={blogFormRef}>
            <div className="container mt-5 blogForm">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body px-4 py-4">
                                <h5 className="card-title">add a blog</h5>
                                <form onSubmit={addBlog}>
                                    <div className="form-group px-4 mt-3">
                                        <label htmlFor="title">title</label>
                                        <input type="text" value={title} className="form-control" name="Title" id="title" placeholder="Type title" onChange={({ target }) => setTitle(target.value)}/>
                                    </div>
                                    <div className="form-group px-4 mt-3">
                                        <label htmlFor="author">Author</label>
                                        <input type="text" value={author} className="form-control" name="Author" id="author" placeholder="Type author" onChange={({ target }) => setAuthor(target.value)} />
                                    </div>
                                    <div className="form-group px-4 mt-3">
                                        <label htmlFor="Url">URL</label>
                                        <input type="text" value={url} className="form-control" name="Url" id="url" placeholder="Type URL" onChange={({ target }) => setUrl(target.value)} />
                                    </div>
                                    <div className="text-center mt-3">
                                        <button type="submit" className="btn btn-primary btn-block" id="create-blog">create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Togglable>
    )
}

export default BlogForm