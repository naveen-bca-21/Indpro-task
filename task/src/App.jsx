import {} from 'react'
import Login from './assets/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './assets/Signup'
import Home from './assets/Home'
import Create from './assets/Create'
import Update from './assets/Update'
import Read from './assets/Read'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/update/:id' element={<Update/>}></Route>
      <Route path='/read/:id' element={<Read/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
