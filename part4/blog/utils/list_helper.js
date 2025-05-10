const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0)
        return 0

    reducer = (sum, current) => {
        return sum + current.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)
        return null

    let mostLikedBlog = {...blogs[0]}

    blogs.forEach(blog => {
        blog.likes > mostLikedBlog.likes
        ? mostLikedBlog = {...blog}
        : null
    });

    return mostLikedBlog;
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return null

    let authorMap = new Map()

    //looping through each blog and counting the number of blogs per author
    blogs.forEach(blog => {
        if (!authorMap.has(blog.author))
            authorMap.set(blog.author, 0)

        authorMap.set(blog.author, authorMap.get(blog.author) + 1)
    })

    let maxAuthor = {
        author: '',
        blogs: 0,
    }

    authorMap.forEach((value, key) => {
        if (maxAuthor.blogs < value){
            maxAuthor.author = key
            maxAuthor.blogs = value
        }
    })

    return maxAuthor
}

const mostLikes = (blogs) => {
    if (blogs.length === 0)
        return null;
    
    let likeCount = {}

    for (const blog of blogs) {
        likeCount[blog.author] = (likeCount[blog.author] || 0) + blog.likes;
    }

    let maxAuthor = {author: '', likes: 0}

    for (const author in likeCount){
        if (likeCount[author] > maxAuthor.likes) {
            maxAuthor = {
                author: author,
                likes: likeCount[author],
            }
        }
    }

    return maxAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}