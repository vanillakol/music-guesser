
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import UserContextProvider from '../context/userContext'
import DashBoard from './pages/DashBoard'
import Logout from './pages/Logout'

axios.defaults.baseURL = 'music-guesser-6her.vercel.app'
axios.defaults.withCredentials = true
function App() {
  

  return (
    <UserContextProvider>
      <Navbar></Navbar>
      <Toaster position='top-center' toastOptions={{duration: 1000}}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </UserContextProvider>
  )
}

export default App
