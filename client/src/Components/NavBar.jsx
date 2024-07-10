/* eslint-disable react/prop-types */

import {  Link, NavLink } from 'react-router-dom'
import '../css/Navbar.css'
import logo from '../assets/bookshop-logo.png'
import { useState } from 'react'

export const NavBar = ({role}) => {
  const [click,setClick]=useState(false);

    const handleClick = () => {
      setClick(!click);
    };
  
  return (
    <nav className='navbar'>
        <div className="navbar-left">
            <Link to='/' className='navbar-brand'><img className="navbar-logo"src={logo}/>Book Store</Link>
        </div>
        <div  className={click ? "navbar-right actives" : "navbar-right"}>
            <NavLink to="/books" className='navbar-link' onClick={handleClick}>Books</NavLink>
            {role==='admin' && <>
             <NavLink to="/addbook" className='navbar-link' onClick={handleClick}>Add Book</NavLink>
             <NavLink to="/addstudent" className='navbar-link' onClick={handleClick}>Add Student</NavLink>
             <NavLink to="/dashboard" className='navbar-link' onClick={handleClick}>Dashboard</NavLink>
             </>
            }
           {role===""?
             <NavLink to="/login" className='navbar-link' onClick={handleClick}>Login</NavLink>
             : <NavLink to="/logout" className='navbar-link' onClick={handleClick}>Logout</NavLink>
           } 
        </div>
        <div className="nav-icon" onClick={handleClick}>
           {click ?<i className='fas fa-times'></i>:<i className='fas fa-bars'></i>}
           </div> 
    </nav>
  )
}
