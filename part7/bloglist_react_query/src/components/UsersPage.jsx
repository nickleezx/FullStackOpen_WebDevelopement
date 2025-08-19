import { Link } from "react-router-dom"



export default function UsersPage({users}) {

    

    const containerStyle = {
        display: 'flex',
    }

    if (users === null) {
        // console.log(users)
        return (<div>loading...</div>)
    }

    return (
        <div>
            <h3>Users</h3>

            <div>
                <b style={{marginLeft: '100px'}}>blogs created</b>

                    {users.map((user) =>
                        <Link to={`/users/${user.id}`}>
                            <div style={containerStyle}>
                                <div style={{minWidth: '100px'}}>{user.username}</div>
                                <div>{user.blogs.length}</div>
                            </div>
                        </Link>
                    )}
            </div>
        </div>
    )
}