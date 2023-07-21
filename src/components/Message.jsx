import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import circle3  from "../assets/circle3.jpg"
import { ChatsContext } from '../Context/ChatsContext'

function Message() {
  const {data}= useContext(ChatsContext)
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
    <div className='message'>
   
    
    
        <Outlet/>
     
    
    </div>
  )
}

export default Message






{/* <div className='message-cont'>
     
<Link to="."> <h2>Mail</h2></Link>
<Link to="mail-history"> <h2>Mail History</h2></Link>



//  <Link to="mail"> <h3>Mail</h3></Link>
// <Link to="mail-history"><h3>Mail-History</h3></Link> 

</div> */}