import Blogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import './index.css'

import { useCheckLoggedUser, useLogout, useUserValue } from './UserContext'
import { useEffect } from 'react'

const App = () => {
    const logout = useLogout()
    const user = useUserValue()

    if (user) {
        return (
            <div>
                <div className='p-5 mb-3 bg-primary text-white'><h2>Blogs</h2></div>
                <div className='p-5'>
                    <Notification />
                    <div className='container'>
                        <div className="row justify-content-end">
                            <div className='col-auto'>
                                <p>{user.name} logged in <button className='btn btn-primary' onClick={logout}>logout</button></p>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <BlogForm />
                    </div>
                    <div className='container mt-5'>
                        <Blogs />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <Notification />
                <LoginForm />
            </div>
        )
    }
}

export default App