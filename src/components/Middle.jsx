import React from 'react'
import Message from './Message'
import SideBar from './SideBar'
import "./comps.css"

function Middle() {
  return (
    <div className='middle'>
        <SideBar/>
        <Message/>
      
    </div>
  )
}

export default Middle
