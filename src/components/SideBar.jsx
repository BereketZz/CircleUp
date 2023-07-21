import React, { useContext, useState } from 'react'
import circle from "../assets/circle.jpeg"
import adduser from "../assets/adduser.svg"
import{signOut } from "firebase/auth"
import{auth} from "../firebase"
import {db} from "../firebase"
import { AuthContext } from '../Context/AuthContext'
import Chats from './Chats'
import { collection, query, where, getDocs,setDoc, updateDoc, serverTimestamp,getDoc,doc } from "firebase/firestore";


function SideBar() {
  const[userName, setUserName]= useState("")
  const[user, setUser]= useState("")
  const[error, setError]= useState(null)
  const{currentUser}= useContext(AuthContext)

  const handleChange= (e)=>{
    setUserName(e.target.value)
  }
  const handleSearch= async()=>{
    const citiesRef = collection(db, "users");
    const q =  query(citiesRef, where("displayName", "==", userName));
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
         setUser(doc.data())
      });

    }catch(err){
      console.log(err)
    setError(err.message)
    }
   
 
  }
  const handleSelect = async ()=>{
    // the two users id is combined to create a unique id to identify the chat between two people 
    const comboId= currentUser.uid > user.uid? currentUser.uid+user.uid : user.uid+currentUser.uid

    try{
     const res  = await getDoc(doc(db, "chats", comboId))
     // check if any chat between the two users exist having the comboId
     if(!res.exists()){
     await setDoc(doc(db, "chats", comboId),{messages:[]})
     //create user chats
     await updateDoc(doc(db, "userChats", currentUser.uid),{
        [comboId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
        },
        [comboId+".date"]: serverTimestamp()

     })
     // for the second user I'll do the same
     await updateDoc(doc(db, "userChats", user.uid),{
        [comboId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
        },
        [comboId+".date"]: serverTimestamp()

     })
     }

    }catch(err){
       
     console.log(err.message)
    }
   setUser(null)
    setUserName("")  


   
}
  
  const resultStyle= {
    display:"flex",
    alignItems:"center",
    justifyContent:"left",
    gap:"10px",
    padding:"10px",
    backgroundColor:"navy",
    borderRadius:"5px",
    marginBottom:"10px"
  }
  const imageStayl={
    width:"40px",
    height:"40px",
    borderRadius:"20px"

  }

 
  return (
    <div  className="sidebar"style={{}}>
        <br/> <br/>
     <div class="input-group">
  <div class="form-outline">
    <input id="search-input" type="search" class="form-control" placeholder='Search for office'  style={{border:"1px solid white",backgroundColor:"white"}}  onChange={handleChange} value={userName}/>
   
  </div>
  <button id="search-button" type="button" class="btn" style={{backgroundColor:"#5d5b8d", color:"white"}} onClick={handleSearch}>
    <i class="fas fa-search"></i>
  </button>
</div>
 <br/> <br/>
 <p style={{textAlign:"center"}}>{ user?.displayName?"": "Search for office, No office Found"}</p>
{ user && <div style={resultStyle} onClick={handleSelect}> 
  <img src={user.photoURL} style={imageStayl} />
  <span>{user.displayName}</span>
 </div>}
 {/* <img src={adduser} style={{width:"80%", padding:"10px"}} /> */}
 <br/>
  <Chats/>


 <button className="btn logout" style={{ backgroundColor:"#5d5b8d",color:"white" }} onClick={()=>signOut(auth)}>Logout</button>

 
    </div>
  )
}

export default SideBar
