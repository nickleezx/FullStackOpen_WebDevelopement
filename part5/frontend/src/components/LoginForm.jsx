import { useState } from "react"

const LoginForm = ({login}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )
}

export default LoginForm