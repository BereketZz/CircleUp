import React, { useContext, useEffect, useState } from 'react'
import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import 'mdb-ui-kit/css/mdb.min.css';
import circle3 from "../assets/circle3.jpg"
import { AuthContext } from '../Context/AuthContext';
import {app} from "../firebase"
import{Link} from "react-router-dom"
// Imports for the dangerous code 
import { collection, query, where, getDocs,setDoc,onSnapshot, updateDoc, serverTimestamp,getDoc,doc, collectionGroup } from "firebase/firestore";
import {db} from "../firebase"


function NavBar() {
    const[language, setLanguage]= useState("united-kingdom")
    const {currentUser}= useContext(AuthContext)
    const fname= currentUser?.displayName.split(" ")[0][0]
    const lname= "O"
    const [unseen, setUnseen]= useState(null)
    //currentUser?.displayName.split(" ")[1][0]
    const tempPhoto= fname+lname
    // This is a very dangerous code :)!!

    useEffect(()=>{

const q = collection(db, "chats");
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
    if(doc.data().seen.view==false && doc.data().seen.senderId!= currentUser?.uid){
      cities.push(doc.data().seen.senderId);
    }
      
  });

  setUnseen(cities)
  console.log("Current cities in CA: ", cities, currentUser?.uid);
});
      // const findMessagesWithText = async () => {

 return ()=> unsubscribe()
        
      //   const querySnapshot = await getDocs(collectionGroup(db, 'chats'));
      //   const messagesWithText = [];
      
      //   querySnapshot.forEach((doc) => {
      //     const chatData = doc.data()
      //       console.log(chatData.seen.senderId)
      //       if(chatData.seen.view== false && chatData.seen.senderId!=currentUser?.uid){
      //         messagesWithText.push(chatData.seen.senderId)
      //       }
      //    // console.log( Object.entries(chatData.seen))
      //     //  if (hold.seen && Array.isArray(hold.seen)) {
      //     //   hold.seen.forEach((seen) => {
            
      //     //     if (seen.view==false) {
            
      //     //       console.log("hey again")
      //     // messagesWithText.push(seen.view);
          

               
             
      //     //     }
      //     //   });
      //     // }
      //   });
      //     setUnseen(messagesWithText)
      //    console.log('Messages with unseen:', messagesWithText);
      // };
      
      // findMessagesWithText();
      //const fistore = app.firestore();

      // const unsubscribe = collectionGroup('chats').onSnapshot((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     // Access the seen.view attribute of each document
      //     const seenView = doc.data().seen.view;
      //     console.log(seenView);
      //     // You can do whatever you want with the seenView value here
      //   });
      // });
  
      // Cleanup the subscription when the component unmounts
   

    },[])
  
    
    const displayView= currentUser?.photoURL?  <img src={currentUser?.photoURL} width={10} height={10} />:<span className='circle-profile'>{tempPhoto}</span>
  return (
    <div>

<nav class="navbar navbar-expand-lg navbar-light bg-light">

  <div class="container-fluid">
    
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    
    <div class="collapse navbar-collapse" id="navbarSupportedContent" >
    
       <h3>Circle<b style={{color:"navy"}}>Up</b></h3>
    
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft:"10vw"}}>
      <li class="nav-item">
          <Link class="nav-link"  to="/login">Home</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Help?</a>
        </li>
        <li>

        <div class="container-fluid">
    <ul class="navbar-nav">
  
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <i class= {`flag-${language} flag m-0`}  ></i>
          
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <a class="dropdown-item" href="#"
              ><i class= {`flag-${language} flag`}  ></i>
              {language=="united-kingdom"?"English":"Ethiopia"}
              <i class="fa fa-check text-success ms-2" ></i
            ></a>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li onClick={()=>language=="united-kingdom"?setLanguage("ethiopia"): setLanguage("united-kingdom")}>
            <a class="dropdown-item" href="#"><i class= {language=="ethiopia"?"flag-united-kingdom flag" :"flag-ethiopia flag"}></i>
           {language=="ethiopia" ?"English":"Ethiopia"}
            </a>
          </li>
        
        </ul>
      </li>
    </ul>
  </div>
        </li>
        {/* <div class="input-group rounded">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <span class="input-group-text border-0" id="search-addon">
    <i class="fas fa-search"></i>
  </span>
</div> */}
      </ul>
     
    </div>
    


    <div class="d-flex align-items-center" style={{backgroundColor:"", marginRight:"10vw", display:"flex", alignItems:"center", justifyContent:"center"}}>

      <Link to="." class="text-reset me-3" href="#">
      <i class="fa-solid fa-envelope" style={{fontSize:"25px"}}></i>
     { unseen!=currentUser?.uid && <span class="badge rounded-pill badge-notification bg-danger">{unseen?.length}</span>}
        
      </Link>

     
      <div class="dropdown">
        <Link
        to="notify"
           
           class="text-reset me-3" 
         
          
          id="navbarDropdownMenuLink"
          role="button"
        
          
        >
          <i class="fas fa-bell" style={{fontSize:"25px"}}></i>
          <span class="badge rounded-pill badge-notification bg-danger">1</span>
        </Link>
     
      </div>
     
      <div class="dropdown">
        <a
          class="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          {displayView}
          {/* <div   style={{ backgroundColor:"gray",height:"40px", width:"40px", borderRadius:"20px", display:"flex",justifyContent:"center", alignItems:"center", border:"1px solid gray", color:"white"}}>{tempPhoto}</div> */}
          {/* <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            class="rounded-circle"
            height={40}
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />  */} &nbsp;
           <span style={{color:"black"}}>{currentUser?.displayName||""}</span>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
          <li>
            <a class="dropdown-item" href="#">My profile</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Settings</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
   
  </div>
 
</nav>


      
    </div>
  )
}

export default NavBar
