import { createContext, useRef, useState } from "react";
import React from 'react'

export const alumnincontext=createContext()






const Alumnincontext = ({children}) => {
  
  const [isopen,setisopen]=useState(false)
  const aboutref=useRef(null)
  const contactref=useRef(null)

  return (
    <alumnincontext.Provider
    value={{isopen,setisopen,aboutref,contactref}}>
        {children}
    </alumnincontext.Provider>
  )
}

export default Alumnincontext