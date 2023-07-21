import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import{auth} from "../firebase"
import { useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext()

export const ChatsContextProvider= ({children})=>{
   const{currentUser} = useContext(AuthContext)
  const INITIAL_STATE={
    chatId:"null",
    user:{}
  }

  const chatReducer= (state,action)=>{
     switch(action.type){
        case "CHANGE_USER":
            return{
                user:action.payload,
                chatId : currentUser.uid > action.payload.uid?
                currentUser.uid+action.payload.uid : action.payload.uid+currentUser.uid
            }
        default:
            return state;    
     }
  }
  const[state,dispatch]= useReducer(chatReducer, INITIAL_STATE)
    return(
        <ChatsContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatsContext.Provider>
    )

   
}