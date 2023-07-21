import React, { useContext, useEffect, useState } from 'react'
import attach from '../assets/attach.svg.png'
import photo from "../assets/img-icon.png"
import {db} from "../firebase"
import { updateDoc, setDoc,doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore'
import {v4 as uuid} from "uuid"
import{storage} from "../firebase"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../Context/AuthContext'
import { ChatsContext } from '../Context/ChatsContext'


function Send() {
    const[text, SetText]= useState("")
    const[img, setImg]= useState(null)
    const seen= false;

    const {currentUser}= useContext(AuthContext)
    const{data}= useContext(ChatsContext)

    useEffect(()=>{

    },[])

    const handleClick= async ()=>{
        if(img){
            console.log("the file is here")

            const storageRef = ref(storage, `/files/${img.name+uuid()}`);
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(

                (error) => {
                  
                }, 
                () => {
                  
                
                  getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                    await updateDoc(doc(db, "chats",data.chatId), {
                        messages: arrayUnion({
                            id:uuid(),
                            text,
                            senderId:currentUser.uid,
                            date:Timestamp.now(),
                            img:downloadURL,
                            
        
        
                        })
                        
                    });
                   // This code is to update the seen object's view property to false
                    await updateDoc (doc(db, "chats",data.chatId), {
                      seen: {
                        view:false,
                        senderId:currentUser.uid,
      
                      }
                    
                      
                  });
              
                  });
                }
              );
         
            
        }else{
            await updateDoc(doc(db, "chats",data.chatId), {
                messages: arrayUnion({
                    id:uuid(),
                    text,
                    senderId:currentUser.uid,
                    date:Timestamp.now(),
                   


                },
              
                )
            });
            await updateDoc (doc(db, "chats",data.chatId), {
                seen: {
                  view:false,
                  senderId:currentUser.uid,

                }
              
                
            });

        }
        await updateDoc(doc(db, "userChats", currentUser?.uid),{
            [data.chatId+".lastMessage"]:{
              text
            },
            [data.chatId+".date"]:serverTimestamp()
    
        })
        await updateDoc(doc(db, "userChats", data.user.uid),{
            [data.chatId+".lastMessage"]:{
              text
            },
            [data.chatId+".date"]:serverTimestamp()
    
        })
        setImg(null)
        SetText("")
    }
    const freeStyle={
        backgroundColor:"	whitesmoke  ",
        width:"60%",
        padding:"20px",
        borderRadius:"30px",
         display:"flex",
         alignItems:"center",
         justifyContent:"space-between",
        marginLeft:"20%"
      }
      const butStyle={
        fontSize:"25px",
        backgroundColor:"navy",
        color:"white",
        width:"50px",
        height:"50px",
        borderRadius:"25px",
        border:"none",
       
      }
      const goStayl={
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:"10px"
      }
 
  return (
 
         <div  style={freeStyle}>
      <input style={{backgroundColor:"transparent", border:"none",outline:"none"}} type="text" placeholder='Write something'  onChange={(e)=>SetText(e.target.value)} value={text}/>
     
      <div className='go-go' style={goStayl}> 
        <label htmlFor='file1'>
       
        <i class="fa-solid fa-paperclip" style={{color:"gray",fontSize:'25px'}}></i>
        </label>
        <input type='file' id="file1" style={{display:"none"}} onChange={(e)=>setImg(e.target.files[0])} />
        <label htmlFor='file2'>
        <i class="fa-solid fa-image" style={{color:"gray",fontSize:'25px'}}></i>
           
        </label>
        <input type='file' id="file2" style={{display:"none"}}/>
        <button onClick={handleClick} style={butStyle}>
        <i class="fa-regular fa-paper-plane" ></i>
          
            </button>
       </div>
    </div>
      
    
  )
}

export default Send
