export default function User({user}) {
    const blogs = user.blogs

    return (
        <div>
            <h3>{user.name}</h3>

            <h4>added blogs</h4>

            <ul>
                {blogs === null 
                    ? null 
                    : blogs.map(blog => <li>{blog.title}</li>)}
            </ul>
        </div>
    )
}