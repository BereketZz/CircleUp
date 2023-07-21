import React from 'react'
import circle from "../assets/circle.jpeg"
import { useContext } from 'react'
import "./comps.css"
import { AuthContext } from '../Context/AuthContext'
import { ChatsContext } from '../Context/ChatsContext'
import { useEffect, useState, useRef } from 'react'





export default function SubHistory({message}) {
  const {currentUser}= useContext(AuthContext)  
  const{data}= useContext(ChatsContext)
  const ref= useRef()
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  
  
 

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
   },[message])

  console.log("here is the message.img: "+message.img)
  return (
 
      <div className={`subhistory ${currentUser.uid==message.senderId && "owner" } `}  ref={ref}>
     
      <div className='subInfo'>
       <img src={currentUser.uid==message.senderId? currentUser.photoURL:data.user.photoURL} width={30} height={30} />
      
      </div>
      <div className='subContent'>
        <div className='txt'>
        <p>{message.text}</p>
      { message.img!=null && <a>
        <i class="fa-solid fa-file-arrow-down fa-3x" style={{color:"white"}}></i>
        </a>}
       
        </div>
        <p>{message.date?.toDate().toLocaleString([], options)}</p>
     
       
    
      </div>
    </div>
 
  )
}
//