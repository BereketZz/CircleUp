import React from 'react'
import NavBar from './NavBar'
import Middle from './Middle'
import { Outlet } from 'react-router-dom'

function Whole() {
  return (
    <>
    <NavBar/>
    <Middle/>
   
    </>
  )
}

export default Whole
