import React from 'react'
import { Link } from 'react-router'

export function NavBar() {
  return (
    <nav className='fixed right-1 p-2 bg-[#03071200]'>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </nav>
  )
}