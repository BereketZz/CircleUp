import React, { useContext, useEffect, useState, useRef } from 'react'

import { ChatsContext } from '../Context/ChatsContext'
import { onSnapshot, doc } from 'firebase/firestore'
import {db} from "../firebase"
import Send from './Send'
import SubHistory from "./subHistory"

function MailHistory() {

  
 



  const[messages, setMessages]= useState([])
  const{data}=  useContext(ChatsContext)

  const ref= useRef()
  useEffect(()=>{
  const unSub= onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      console.log("this is the doc"+doc.data())
      doc.exists() && setMessages(doc.data().messages)
  })
  return ()=>{
      unSub()
  }
  },[data.chatId])

  const wholeName= data.user.displayName? data.user.displayName: null
  var fname=""
  var lname=""
  if(wholeName){
    fname= wholeName.split(" ")[0][0] 
    lname= "O"
    //wholeName.split(" ")[1][0]? wholeName.split(" ")[1][0]: "O"
  }
  const merged = fname+lname


 
  // const tempPhoto= fname+lname
  //   <img src={data.user.photoURL} />

  const displatView= data.user.photoURL?  <img src={data.user.photoURL} />:<span className='circle-profile'>{merged}</span>


  return (
    <>
       { data.user.displayName &&   <div  className="status">

{displatView}
<span>{data.user?.displayName}</span>
</div> } 
<br/>
 
   <div className='mail-history' >

    
   {
            messages?.map( m=>{
                return <SubHistory message={m} />
            })
        }


   
   
    </div>
    <br/>
   
    <Send/>
    </>

  )
}

export default MailHistory
