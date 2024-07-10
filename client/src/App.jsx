

import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import { Home } from './Components/Home'
import { NavBar } from './Components/NavBar'
import { Books } from './Components/Books'
import { Login } from './Components/Login'
import { Dashboard } from './Components/Dashboard'
import { AddStudent } from './Components/AddStudent'
import { useEffect, useState } from 'react'
import { Logout } from './Components/Logout'
import axios from 'axios'
import ProtectedRoute from './Components/ProtectedRoute'
import { AddBook } from './Components/AddBook'
import { EditBook } from './Components/EditBook'
import { DeleteBook } from './Components/DeleteBook'


function App() {
   const [role,setRole]=useState('')
   axios.defaults.withCredentials=true;
   useEffect(()=>{
     axios.get('http://localhost:3000/auth/verify')
     .then(res=>{
       if(res.data.login){
          setRole(res.data.role)
       }else{
         setRole('')   
       }
       console.log(res)
     }).catch(err=>console.log(err))
   },[])
  return (
    <>
    <BrowserRouter>
    <NavBar role={role}/>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/books' element={<Books role={role}/>}></Route>
        <Route path='/login' element={<Login setRoleVar={setRole}/>}></Route>
        <Route path='/dashboard' element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>}></Route>
        <Route path='/addstudent' element={
                        <ProtectedRoute>
                            <AddStudent/>
                        </ProtectedRoute> }></Route>
        <Route path='/logout' element={<Logout setRole={setRole}/>}></Route>
        <Route path='/addbook' element={
                        <ProtectedRoute>
                            <AddBook/>
                        </ProtectedRoute> }></Route>
       <Route path='/book/:id' element={
                  <ProtectedRoute>
                      <EditBook/>
                  </ProtectedRoute>}></Route>
      <Route path='/delete/:id' element={
                  <ProtectedRoute>
                      <DeleteBook/>
                  </ProtectedRoute>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
