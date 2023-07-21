import React, {useState} from 'react'
import {auth} from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, query, where ,getDocs, doc , setDoc} from "firebase/firestore";
import {db} from "../firebase"
import { Link , useNavigate} from 'react-router-dom'

function Register() {
  const[input, setInput]= useState({
    officeName:"",
    email:"",
    password:""
  })
  const[status, setStatus]= useState(null)
  const[error,setError]= useState(null)
  const navigate= useNavigate()

  const handleChange= (event)=>{
    setInput(prev=>{
      return{
        ...prev,
        [event.target.name]:event.target.value
      }
    })
  }

  const handleSubmit= async (e)=>{
  e.preventDefault()
  const officName= input.officeName
   const email= input.email;
   const password= input.password
   try{
    setStatus("Signing up ...")
    const citiesRef = collection(db, "users");


// Create a query against the collection.
const q =  query(citiesRef, where("displayName", "==", officName));
const querySnapshot = await getDocs(q);
if(!querySnapshot.empty){
  setError("Office Name Already Exist!")
  return setStatus(null)
}

  const res= await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(res.user,{
    displayName:officName
  })
  await setDoc(doc(db ,"users", res.user.uid),{
    uid:res.user.uid,
    displayName:officName,
    email
    
  })
  await setDoc(doc(db, "userChats", res.user.uid),{})
   navigate("/login")
   setError(null)

   }catch(err){
    setError(err.message)
    setStatus(null)
   }

  }
  return (
    <div>
          <section class="vh-100"  style={{backgroundColor:"navy"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong"  style={{borderRadius:"#1rem"}}>
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Sign up</h3>
            {   error &&         <div class="alert alert-danger" role="alert">
              <span><i class="fa-solid fa-circle-xmark"></i></span> &nbsp;
  {error}
</div>
}
            <div class="form-outline mb-4">
              <input type="text" id="typePasswordX-2"  placeholder="Office Name" style={{padding:"7px", width:"100%"}} name="officeName" onChange={handleChange}  />
             
            </div>

            <div class="form-outline mb-4">
              <input type="email" id="typeEmailX-2" placeholder='Email'  style={{padding:"7px",width:"100%" }}  name="email" onChange={handleChange}/>
             
            </div>
            

            <div class="form-outline mb-4">
              <input type="password" id="typePasswordX-2"  placeholder="Password" style={{padding:"7px", width:"100%"}} name="password" onChange={handleChange} />
             
            </div>


            <button class="btn btn-primary btn-lg btn-block" disabled={status!=null} style={{backgroundColor:"navy"}} type="submit" onClick={handleSubmit}>{ status? status:"Sign up"}</button>

            <hr class="my-4" />

            <button class="btn btn-lg btn-block btn-primary" style={{backgroundColor:"#dd4b39"}} 
              type="submit"><i class="fab fa-google me-2"></i> Sign up with google</button>
            <button class="btn btn-lg btn-block btn-primary mb-2" style={{backgroundColor:"#3b5998"}}  
              type="submit"><i class="fab fa-facebook-f me-2"></i>Sign up with facebook</button> <br/>
              <p> Already have an account? <Link to="/login">Login</Link></p>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Register
