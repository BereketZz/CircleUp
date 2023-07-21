import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { signInWithEmailAndPassword } from 'firebase/auth'
import{auth} from "../firebase"


function Login() {
  const[input, setInput]= useState({
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
   const email= input.email;
   const password= input.password
   try{
    setStatus("Loging in ...")
  const res= await signInWithEmailAndPassword(auth, email, password)
   navigate("/dash")
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
         <form>
            <h3 class="mb-5">Log in</h3>
        
{   error &&         <div class="alert alert-danger" role="alert">
              <span><i class="fa-solid fa-circle-xmark"></i></span> &nbsp;
  {error}
</div>
}
            <div class="form-outline mb-4">
              <input type="email" id="typeEmailX-2" placeholder='Email'  style={{padding:"7px",width:"100%" }} name="email" onChange={handleChange}/>
             
            </div>
            

            <div class="form-outline mb-4">
              <input type="password" id="typePasswordX-2"  placeholder="Password" style={{padding:"7px", width:"100%"}} name="password" onChange={handleChange} />
             
            </div>

         

            <button class="btn btn-primary btn-lg btn-block" disabled={status!=null} onClick={handleSubmit}  style={{backgroundColor:"navy"}} type="submit">{status?status:"Login"}</button>
            </form>
            <hr class="my-4" />

            <button class="btn btn-lg btn-block btn-primary" style={{backgroundColor:"#dd4b39"}} 
              type="submit"><i class="fab fa-google me-2"></i> Sign in with google</button>
            <button class="btn btn-lg btn-block btn-primary mb-2" style={{backgroundColor:"#3b5998"}}  
              type="submit"><i class="fab fa-facebook-f me-2"></i>Sign in with facebook</button> <br/>
              <p>Don't have an account?&nbsp;<Link to="/register">Register</Link> </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      
    </div>
  )
}

export default Login
