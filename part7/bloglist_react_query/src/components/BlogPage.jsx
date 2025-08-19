import { useMutation, useQueryClient } from "@tanstack/react-query"
import blogService from '../services/blogs'
import { useState } from "react"

export default function BlogPage({ blog }) {

    const [comments, setComments] = useState("")

    const queryClient = useQueryClient()

    const likeBlogMutation = useMutation({
        mutationFn: blogService.updateBlog,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
        onError: (e) => {
            console.error(e)
        }
    })

    const handleClick = async () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        likeBlogMutation.mutate(updatedBlog)
    }

    const addComments = async (e) => {
        e.preventDefault()
        setComments("")
        await blogService.addComments(comments, blog.id)
        queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }

    return (
        <div>
            <h2>{blog.title}</h2>

            <a href={blog.url}>
                <div>{blog.url}</div>
            </a>
            <div>
                <span>{blog.likes} likes</span>
                <button onClick={handleClick}>like</button>
            </div>
            <div>
                added by {blog.author}
            </div>

            <div><b>Comments</b></div>
            <div>
                <input type="text" name="comments" value={comments} onChange={(e) => setComments(e.target.value)}/>
                <button onClick={addComments}>add comment</button>
            </div>

            <ul>
                {blog?.comments.map(comment => <li>{comment}</li>)}
            </ul>
        </div>
    )
}