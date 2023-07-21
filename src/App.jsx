import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Middle from './components/Middle'
import Whole from './components/Whole'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Mail from './components/Mail'
import Message from './components/Message'
import MailHistory from './components/MailHistory'
import "./components/comps.css"
import SubHistory from './components/subHistory'
import Login from './pages/Login'
import Notification from './pages/Notification'
import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import 'mdb-ui-kit/css/mdb.min.css';
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <BrowserRouter>
   
   
    
      <Routes>
       
    <Route path='/' element={<NavBar/>} />
     <Route path='/dash' element={<Whole/>} >
     
        {/* <Route index  element={<Mail/>} /> */}
       
        <Route  index element={<MailHistory/>} />
        <Route path="notify" element={<Notification/>} />
        
 
    
      </Route> 
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element ={<Register/>} />
     
     
    </Routes>
 
    
    
    </BrowserRouter>
 
    </>
  )
}

export default App
