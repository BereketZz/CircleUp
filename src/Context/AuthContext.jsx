import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import{auth} from "../firebase"

export const AuthContext = createContext()

export const AuthContextProvider= ({children})=>{
    const [currentUser, setCurrentUser]= useState()
    
    useEffect(()=>{

      const caller= ()=>{

        onAuthStateChanged(auth, (user) => {
          setCurrentUser(user)
          });
      }
      return caller()
 

    },[])
    return(
  
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>

    )

}
