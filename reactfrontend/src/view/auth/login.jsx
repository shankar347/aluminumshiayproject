import React, { useState } from 'react'
import img2 from '../../assets/img2.jpg'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import authatom from '../atoms/authatom'
import {toast} from 'react-toastify'
import useratom from '../atoms/useratom'
const Login = () => {
    
  const [isfocused3,setisfocused3]=useState(false)
  const [isfocused4,setisfocused4]=useState(false)
  const [auth,setauth]=useRecoilState(authatom)
  
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const[user1,setuser]=useRecoilState(useratom)
  const handlelogin=async()=>{
     try{
         if(!email || !password){
          toast.error("Provide username and password")
          return
         }
         const user={
          email:email,
          password:password
         }
         const res=await fetch('/api/login/',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(user)
         })

         if(!res.ok)
         {
          const errdata=await res.json()
          if(errdata?.email)
          {
            toast.error('Email is not registered')
            return
          }
          else if(errdata?.password)
          {
            toast.error('Password is incorrect')
            return
          }
          else
          {
            toast.error('Invalid credentials')
            return
          }
        
         }

         const data=await res.json()
         setuser(data)
         localStorage.setItem('token',JSON.stringify(data))
         toast.success('Logged in successfully')
     }
     catch(err)
     {
      console.log(err)
      toast.error(err)
     }
  }
    return (
    <div className='min-h-screen flex items-center 
    justify-center bg-cover bg-center'
    style={{backgroundImage:`url(${img2})`}}>
    <div className='absolute inset-0 bg-black 
    opacity-20'>
    </div>
    <div className='w-full max-w-md bg-gray-200 z-10 
    rounded-lg'>
        <div className='font-medium  text-xl mt-5 
    text-red-500  text-center mb-5'>
        Login
      </div>
      <div className='flex flex-col gap-2 px-2 '>
         <div className={`flex gap-2 mb-2 
           ${isfocused3 ? 
              'border-2 border-blue-500 rounded' :
               'border-2 border-transparent'}
         py-1 items-center px-2`}>
          <FaEnvelope/>
          <input type="email" 
           onFocus={()=>setisfocused3(true)}
           onBlur={()=>setisfocused3(false)}
           value={email}
           onChange={(e)=>setemail(e.target.value)}
          placeholder='Enter your email ' 
          className='w-full outline-none
           bg-transparent'/>
         </div>
         <div className={`flex gap-2 mb-2
          ${isfocused4 ? 
              'border-2 border-blue-500 rounded' :
               'border-2 border-transparent'}
         py-1 items-center px-2`}>
          <FaLock/>
          <input type="password"
           onFocus={()=>setisfocused4(true)}
           onBlur={()=>setisfocused4(false)}
           value={password}
           onChange={(e)=>setpassword(e.target.value)}
          placeholder='Enter your password' 
          className='w-full outline-none
           bg-transparent'/>
         </div>
      </div>
      <div className='cursor-pointer rounded-full 
         mx-auto text-sm bg-red-400 
         hover:bg-red-300 focus:bg-red-300 w-28
         h-10 my-4 items-center flex justify-center'
         onClick={handlelogin}>
          Submit
         </div>
         <div className='flex gap-2 justify-center
         mx-auto font-semibold mb-5 text-sm'>
          <div className=''>
            Dont't have an account?
          </div>
          <div className='text-blue-500 cursor-pointer 
          hover:text-blue-400 
          focus:text-blue-400'
          onClick={()=>setauth('Register')}>
            Register
          </div>
         </div>
    </div>
    </div>
  )
}

export default Login