
import React, { useContext, useEffect, useState } from 'react'
// import profile1 from '../assets/profile1.jpg'
import  circle from "../assets/circle.jpeg"
import {db} from "../firebase"
import { AuthContext } from '../Context/AuthContext';
import { ChatsContext } from '../Context/ChatsContext';
import { collection, query, where, getDocs,setDoc,onSnapshot, updateDoc, serverTimestamp,getDoc,doc, collectionGroup } from "firebase/firestore";

function Chats() {
 //5d5b8d

    const resultStyle= {
     
       color:"lightgray",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        
        gap:"10px",
        padding:"5px",
        backgroundColor:"#3e3c61",
       
      
        borderRadius:"5px",
        marginBottom:"10px"
      }
      const imageStayl={
        border:"1px solid black",
        width:"40px",
        height:"40px",
        borderRadius:"20px"
    
      }
    const[chats, setChats]= useState([])
    const {currentUser}= useContext(AuthContext)
    const {dispatch} = useContext(ChatsContext)
    const{data}= useContext(ChatsContext)
    const [unseen, setUnseen]= useState(null)
   
    useEffect(()=>{

        const getChats= ()=>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (doc) => {
                // console.log("Current data: ", doc.data());

             setChats(doc.data())
             });

             const q = collection(db, "chats");
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
           querySnapshot.forEach((doc) => {
         if(doc.data().seen.view==false && doc.data().seen.senderId!= currentUser?.uid){
         cities.push(doc.data().seen.senderId);
           }
      
  });
  setUnseen(cities)
  console.log("Current cities in CA chats: ", cities, currentUser?.uid);
});
     
             return ()=>{
                unsub() && unsubscribe()
             }
        }
        currentUser?.uid && getChats()
        
    },[currentUser?.uid])

    const handlePick= async (u)=>{
        dispatch({type:"CHANGE_USER", payload:u}) 
      const setView= async ()=>{
        const unsub=  await updateDoc (doc(db, "chats",data?.chatId), {
          seen: {
            view:true,
           // senderId:currentUser.uid,

          }
        
          
      });
      return ()=> unsub()

      }  


      data.chatId &&  setView()
        
        

    }
  console.log("Mr."+Object.entries(chats))
  return (
    <div>
        
{    Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(     
 <div style={resultStyle}  onClick={()=>handlePick(chat[1].userInfo)} key={chat[0]}> 
 <div>
  <img src={circle} style={imageStayl} />
  <span>{chat[1].userInfo.displayName}</span>
  </div>
  <p>
{ chat[1].userInfo.uid==unseen && <span class="badge rounded-pill badge-notification bg-danger">{unseen.length}</span>}
  </p>
  </div>  
  
  ))}
      
    </div>
  )
}

export default Chats
