import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const blogFormRef = useRef()

    const sendBlog = (event) => {
        event.preventDefault()

        const newObj = {
            title: title,
            author: author,
            url: url,
        }

        dispatch(addBlog(newObj))

        blogFormRef.current.toggleVisibility()
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <div className="container">
            <Togglable
                buttonLabel="new blog"
                secondButtonLabel="cancel"
                ref={blogFormRef}
            >
                <div className="container mt-5 blogForm">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body px-4 py-4">
                                    <h5 className="card-title">add a blog</h5>
                                    <form onSubmit={sendBlog}>
                                        <div className="form-group px-4 mt-3">
                                            <label htmlFor="title">title</label>
                                            <input
                                                type="text"
                                                value={title}
                                                className="form-control"
                                                name="Title"
                                                id="title"
                                                placeholder="Type title"
                                                onChange={({ target }) =>
                                                    setTitle(target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-group px-4 mt-3">
                                            <label htmlFor="author">Author</label>
                                            <input
                                                type="text"
                                                value={author}
                                                className="form-control"
                                                name="Author"
                                                id="author"
                                                placeholder="Type author"
                                                onChange={({ target }) =>
                                                    setAuthor(target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-group px-4 mt-3">
                                            <label htmlFor="Url">URL</label>
                                            <input
                                                type="text"
                                                value={url}
                                                className="form-control"
                                                name="Url"
                                                id="url"
                                                placeholder="Type URL"
                                                onChange={({ target }) =>
                                                    setUrl(target.value)
                                                }
                                            />
                                        </div>
                                        <div className="text-center mt-3">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block"
                                                id="create-blog"
                                            >
                                                create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Togglable>
        </div>
    )
}

export default BlogForm
