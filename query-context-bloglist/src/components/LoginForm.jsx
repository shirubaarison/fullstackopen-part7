import { useState } from 'react'
import { useLogin } from '../UserContext'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = useLogin()

    const loginSubmit = (event) => {
        event.preventDefault()

        const loginObj = {
            username: username,
            password: password
        }

        setUsername('')
        setPassword('')

        login(loginObj)
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body px-4 py-4">
                            <h5 className="card-title text-center">Login</h5>
                            <form onSubmit={loginSubmit}>
                                <div className="form-group px-4 mt-3">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" value={username} className="form-control" name="Username" id="username" placeholder="Enter username" onChange={({ target }) => setUsername(target.value)}/>
                                </div>
                                <div className="form-group px-4 mt-3">
                                    <label htmlFor="username">Password</label>
                                    <input type="password" value={password} className="form-control" name="Password" id="password" placeholder="Enter password" onChange={({ target }) => setPassword(target.value)} />
                                </div>
                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-primary btn-block" id="login-button">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm