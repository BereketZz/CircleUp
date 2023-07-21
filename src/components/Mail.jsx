import React from 'react'
import upload from "../assets/upload.png"
import upload2 from "../assets/upload2.png"
function Mail() {
  return (
    <div className='mail'>
   
      <form style={{width:"50%"}}>
 
  <div class="form-outline mb-4">
    <input type="text" id="form4Example1" class="form-control" />
    <label class="form-label" for="form4Example1">Header</label>
  </div>

 
 

  <div class="form-outline mb-4">
    <textarea class="form-control" id="form4Example3" rows="4"></textarea>
    <label class="form-label" for="form4Example3" >Message</label>
  </div>

  <input type="file" id="file" style={{display:"none"}} />
  <label htmlFor='file'>
  <img src={upload2} htmlFor="#file"  style={{backgroundColor:"white" ,width:"100px", height:"100px"}}/>
  </label>
 


 

  <button type="submit" class="btn  btn-block mb-4">Send</button>
</form>
    </div>
  )
}

export default Mail
