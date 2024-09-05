import React, { useContext, useState, useEffect } from 'react'
import "./pages.css"
import alex from '../assets/exit.jpg'
import meeting from '../assets/meeting.jpg'
import {db, storage} from "../firebase"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, setDoc,doc, arrayUnion, Timestamp, serverTimestamp,onSnapshot } from 'firebase/firestore'
import {v4 as uuid} from "uuid"
import { AuthContext } from '../Context/AuthContext'


function Notification() {
    const[posts, setPosts]= useState([])
    const[input, setInput]= useState("")
    const [img, setImg]= useState(null)
    const[type, setType]=useState(null)
    const {currentUser} = useContext(AuthContext)
    const[filt, setFilt]= useState(null)
    const options = {  month: 'long', day: 'numeric'};
 



    useEffect(()=>{
        const unSub= onSnapshot(doc(db, "posts", "post-doc"), (doc)=>{
            console.log("this is the doc"+doc.data())
            doc.exists() && setPosts(doc.data().post)
        })
        return ()=>{
            unSub()
        }
        },[])
        

        console.log("Here is the post: ", posts)


    const handlePost= async ()=>{
        if(img){
            console.log("the file is here")

            const storageRef = ref(storage, `/posts/${img.name+uuid()}`);
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(

                (error) => {
                  
                }, 
                () => {
                  
                
                  getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                    await updateDoc(doc(db, "posts","post-doc"), {
                        post: arrayUnion({
                            id:uuid(),
                            input,
                            posterId:currentUser.uid,
                            date:Timestamp.now(),
                            img:downloadURL,
                            posterName: currentUser.displayName,
                            type
                            
        
        
                        })
                        
                    });
            
              
                  });
                }
              );
         
            
        }else{
            await updateDoc(doc(db, "posts","post-doc"), {
                post: arrayUnion({
                    id:uuid(),
                    input,
                    posterId:currentUser.uid,
                    date:Timestamp.now(),
                    posterName: currentUser.displayName,
                    type
                   


                },
              
                )
            });
     

        }
       setImg(null)
       setInput("")
       setType(null)


    }

   const selected=  filt ? posts.filter(p=>p.type==filt):posts

   
  return (
    <>
  
 
    <div className='notify-cont' >
    <div style={{display:"flex",justifyContent:"left", width:"50%", position:"sticky"}}>
     Filter Posts  &nbsp; &nbsp;   
     <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="social" onClick={(e)=>setFilt(e.target.value)} />
  <label class="form-check-label" for="inlineRadio1">Social</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="promotion" onClick={(e)=>setFilt(e.target.value) } />
  <label class="form-check-label" for="inlineRadio2">Promotion</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="all" onClick={(e)=>setFilt(null)} />
  <label class="form-check-label" for="inlineRadio4">All</label>
</div>
   </div>
      
        <div className='head-cont '>
           
         <input type="text" placeholder='What do you want to talk ..'  className='talk-input' onChange={(e)=>setInput(e.target.value)} value={input}/> <br/> 
         <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <div style={{display:"flex", mt:"40px", gap:"20px", justifyContent:'center', alignItems:"center"}}>
              <input type="file" id="file" style={{display:"none"}}  onChange={(e)=>setImg(e.target.files[0])} />  
              <label htmlFor='file'>
              <i class="fa-solid fa-image" style={{color:"navy",fontSize:'25px'}}></i> <span>Photo</span>
              </label>

              <label>
              <i class="fa-brands fa-youtube" style={{color:"darkgreen",fontSize:'25px'}}></i> <span>Video</span>
              </label>

              <label>
              <select class="form-select"  style={{width:"150px", height:"40px"}} >
  <option selected>Event Type</option>
  <option value="social" onClick={(e)=>setType(e.target.value)}>Social</option>
  <option value="promotion"  onClick={(e)=>setType(e.target.value)}>Promotion</option>
  <option value="announcement"  onClick={(e)=>setType(e.target.value)}>Announcement</option>
</select>

              </label>
           

         
            </div>
         

         <button className='btn' style={{backgroundColor:"navy", color:"white"}} onClick={handlePost}>Post</button>
         </div>
        
        </div>
       
       <div className='posts-wraper'>

        {
            selected?.sort((a,b)=>b.date-a.date).map((post)=>(
                
                <div className='posts-cony' key={post.id}>
                  
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%",gap:"10px"}}>
                      <div  style={{display:"flex", alignItems:"center", justifyContent:"left", width:"100%",gap:"10px"}} >
                      <div style={{width:"40px", height:"40px", backgroundColor:" #2f2d52",color:"white", borderRadius:"20px",display:"flex", alignItems:"center", justifyContent:"center" }}>{ post?.posterName.split(" ")[0][0]+post?.posterName.split(" ")[0][1] }</div>
                      <span>{post.posterName}</span>

                      </div>
 
                      <div style={{width:"100px"}}>{post.date?.toDate().toLocaleString([], options)}</div>
                      
                     
                      
                      
                     
                </div>
               <p style={{marginTop:"10px", color:"black"}}><b>#</b>{post.type}</p>
               <p>{post.input}</p>
      
              { post.img && <img src={post.img} style={{width:"100%"}} />}
               <hr/>
            
              </div> 
            ))
        }
      


     




       </div>
                   
      


       



     
 


               
        
       
      
    </div>
    
   
   
    
    </>
    
  )
}

export default Notification
