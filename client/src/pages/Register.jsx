import React, {useState} from 'react'

import { initializeApp } from "firebase/app";
import {  createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {auth, storage, db} from "../firebase"
import { useNavigate , Navigate, Link} from 'react-router-dom';



function Register() {

 
    const navigate= useNavigate()


    const[input, setInput]= useState({
        name:"",
        email:"",
        password:""
      })

      const[ error, setError]= useState(null)
     
      const inputStyle= {
        border:"1px solid gray",
        borderRadius:"5px",
        padding:"10px",
        width:"92%",
        
       
    
      }
      const subdivStyle= {
        width:"100%",
        height:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
       
      }
      const butStyle={
        width:"100%",
        border:"none",
        borderRadius:"5px",
        padding:"15px",
        color:"white",
        backgroundColor:"orange",
        
      }
      const handleChange= (event)=>{
        setInput((prev)=>{
          return {
            ...prev,
            [event.target.name]:event.target.value
          }
        })
      }
      const handleSubmit= async (event)=>{
        event.preventDefault()
        const displayName= event.target[0].value
        const email= event.target[1].value
        const password= event.target[2].value
        const file= event.target[3].files[0]
        


        try{
        const res = await createUserWithEmailAndPassword(auth, email, password)

        
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on(

  (error) => {
    
  }, 
  () => {
    
  
    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
       await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL
       })
       await setDoc(doc(db ,"users", res.user.uid),{
        uid:res.user.uid,
        displayName,
        email,
        photoURL:downloadURL
      })
     await setDoc(doc(db, "userChats", res.user.uid),{});
      navigate("/")

    });
  }
);

      
        }catch(err){
            setError(err.message)

        }


    
     
    
      }
  return (
    <div style={{width:"100vw", height:"86vh", }}>
     
     <div  style={subdivStyle} >
      
      <form onSubmit={handleSubmit} >
      <h2>Register</h2> <br/>
      <input style={inputStyle} type="text" placeholder='user name' name="name" onChange={handleChange} /><br/> 
        <input style={inputStyle} type="text" placeholder='beki@gmail.com' name="email" onChange={handleChange} /><br/> 
        <input style={inputStyle} type="password" placeholder='password' name="password" onChange={handleChange} /> <br/> 
      
         <input type='file'  id="file" /> <br/> <br/>
         {error && <p style={{color:"red"}}>{error} <br/></p>}
        <button style={butStyle}   >Register</button> <br/><br/>
        <div>Already have an account? <Link to ="/login" style={{color:"darkblue", textDecoration:"none"}}> Login</Link></div>
      </form>
     </div>
    </div>
  )
}

export default Register


// YABI
//
//ELNA