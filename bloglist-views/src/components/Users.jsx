import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../requests'
import { Link, Route, Routes, useMatch } from 'react-router-dom'

const User = ({ user }) => {
    return (
        <tr>
            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
            <td>{user.blogs.length}</td>
        </tr>
    )
}

const UserView = ({ user }) => {
    return (
        <div className='container'>
            <h1>{user.username}</h1>
            <br></br>
            <h3>added blogs</h3>
            <br></br>
            <ul>
                {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
            </ul>
        </div>
    )
}


const Users = () => {
    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
    })

    const match = useMatch('/users/:id')

    if (usersQuery.isLoading || usersQuery.isError)
        return <div>users not available due to problems in server</div>

    const users = usersQuery.data.sort((a, b) => b.blogs.length - a.blogs.length)

    const user = match ? users.find(user => user.id === match.params.id) : null

    return (
        <Routes>
            <Route path=':id' element={<UserView user={user}/>} />
            <Route path='/' element={
                <table className="table" id="blog-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <User key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>} />
        </Routes>
    )
}

export default Users