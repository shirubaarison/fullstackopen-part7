import { Link } from 'react-router-dom'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }

    return (
        <div className='container'>
            <Link to='/' style={padding}>home</Link>
            <Link to='/users' style={padding}>users</Link>
        </div>
    )
}

export default Menu