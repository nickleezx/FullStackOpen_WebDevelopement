import { BrowserRouter as Router } from 'react-router-dom'
import MainPage from './components/MainPage'

export default function App() {
  // const [blogs, setBlogs] = useState([])

  // useEffect(() => {
  //   blogService
  //     .getAll()
  //     .then(blogs => setBlogs(blogs))
  // }, [])

  return (
    
    <MainPage />
    // <div>
    //   <h2>blogs</h2>
    //   {blogs.map((blog, index) => <Blog key={index} blog={blog} />)}
    // </div>
  )
}
