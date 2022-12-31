import Login from './pages/Login'
import Home from './pages/Home'
import log from './utils/coolog'
import Register from './pages/Register'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Context from './components/Context'
import Alert from './components/Alert'

function App() {
  log.info('App -> render')

  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.token)
  const [message, setMessage] = useState()
  const [level, setLevel] = useState()
  const navigate = useNavigate()

  const login = token => {
    sessionStorage.token = token

    setLoggedIn(true)

    navigate('/')
  }

  const logout = () => {
    delete sessionStorage.token

    setLoggedIn(false)
  }

  const showAlert = (message, level) => {
    setMessage(message)
    setLevel(level)
  }

  const closeAlert = () => setMessage()

  return <Context.Provider value={{ login, logout, showAlert }}>
    {loggedIn ? <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
      :
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>}

    {message && <Alert message={message} level={level} onClose={closeAlert} />}
  </Context.Provider>
}

export default App;