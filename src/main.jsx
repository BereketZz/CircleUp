import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContext, AuthContextProvider } from './Context/AuthContext.jsx'
import { ChatsContextProvider } from './Context/ChatsContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
<AuthContextProvider>
 <ChatsContextProvider >
 <React.StrictMode>
    <App />
  </React.StrictMode>
 </ChatsContextProvider>


</AuthContextProvider>



)
