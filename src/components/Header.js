import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header className='sticky-top'>
        <Topbar/>
        <Navbar/>
    </header>
  )
}
