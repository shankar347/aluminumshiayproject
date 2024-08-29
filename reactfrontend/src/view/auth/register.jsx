import React, { useEffect, useRef, useState } from 'react'
import img1 from '../../assets/img1.jpg'
import { FaEnvelope, FaEye, FaLock, FaPhoneAlt, FaUser } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import authatom from '../atoms/authatom'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useratom from '../atoms/useratom'
const Registerform = () => {

  
  const [isfocused1,setisfocused1]=useState(false)
  const [isfocused2,setisfocused2]=useState(false)
  const [isfocused3,setisfocused3]=useState(false)
  const [isfocused4,setisfocused4]=useState(false)
  
  const [auth,setauth]=useRecoilState(authatom)
  const [user,setuser]=useState({
    name:'',
    email:'',
    password:'',
    phone_no:'',
  })
  const navigate=useNavigate()
  const [user1,setuser1]=useRecoilState(useratom)
  
  const [loading,setloading]=useState(false)
 
  const handleregisteruser=async()=>{
   try{

    if (!user.name || !user.email ||
      !user.password || !user.phone_no) {
     toast.error('Provide all the fields')
      return
      }
     
     setloading(true)
     const res=await fetch(`/api/register/`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(user)
     })

     if(!res.ok)
     {
      const errdata=await res.json()
      console.log(errdata)
    
      if(errdata?.email !== undefined)
      {
        console.log(errdata?.email)
        return toast.error(`Email Already exists`)
        
      }
      if(errdata?.phone_no !== undefined)
      {
        console.log(errdata?.phone_no)
        return toast.error(`Phone Number Already exists`)
      }
      return
     }
   
     const data=await res.json()
     setuser1(data)
     toast.success('Registered successfully')
     localStorage.setItem('token',JSON.stringify(data))
     navigate('/')
   }
   catch(err)
   {
    console.log(err)
    toast.error(err?.message)
   } 
   finally{
    setloading(false)
   }
  }

  return (
    <div className='min-h-screen  flex items-center justify-center
    bg-cover bg-center '
    style={{backgroundImage:`url(${img1})`}}>
    <div className='absolute inset-0 bg-black opacity-20'>

    </div>
    <div className='w-full max-w-md   bg-gray-200 z-10 
    border-2 rounded-lg'>
    <div className='font-medium  text-xl mt-5 
    text-red-500  text-center mb-5'>
        Sign Up
      </div>
      <div className='flex flex-col gap-2 px-2 '>
         <div className={`flex gap-2 py-1  ${isfocused1 ? 
          'border-2 border-blue-500 rounded' :
           'border-2 border-transparent'} 
         } mb-2 items-center px-2`}>
          <FaUser/>
          <input type="text" 
          onFocus={()=>setisfocused1(true)}
          onBlur={()=>setisfocused1(false)}
          value={user.name}
          onChange={(e)=>setuser({...user,name:e.target.value})}
          placeholder='Enter your name' 
          className='w-full outline-none  text-md  bg-transparent'/>
         </div>
         <div className={`flex gap-2 mb-2 
           ${isfocused3 ? 
              'border-2 border-blue-500 rounded' :
               'border-2 border-transparent'}
         py-1 items-center px-2`}>
          <FaEnvelope/>
          <input type="email" 
           onFocus={()=>setisfocused3(true)}
           onBlur={()=>setisfocused3(false)}
           value={user.email}
           onChange={(e)=>setuser({...user,email:e.target.value})}
          placeholder='Enter your email ' 
          className='w-full outline-none
           bg-transparent'/>
         </div>
         <div className={`flex gap-2 py-1 mb-2 
            ${isfocused2 ? 
              'border-2 border-blue-500 rounded' :
               'border-2 border-transparent'}
         items-center px-2`}>
          <FaPhoneAlt/>
          <input type="text" 
           onFocus={()=>setisfocused2(true)}
           onBlur={()=>setisfocused2(false)}
           value={user.phone_no}
           onChange={(e)=>setuser({...user,phone_no:e.target.value})}
          placeholder='Enter your phone no' 
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
           value={user.password}
           onChange={(e)=>setuser({...user,password:e.target.value})}
          placeholder='Enter your password' 
          className='w-full outline-none
           bg-transparent'/>
         </div>
      </div>
         <div className='cursor-pointer rounded-full 
         mx-auto text-sm bg-red-400 
         hover:bg-red-300 focus:bg-red-300 w-28
         h-10 my-4 items-center flex justify-center'
         onClick={handleregisteruser}>
          Submit
         </div>
         <div className='flex gap-2 justify-center
         mx-auto font-semibold mb-5 text-sm'>
          <div className=''>
            Already have an account?
          </div>
          <div className='text-blue-500 cursor-pointer 
          hover:text-blue-400 
          focus:text-blue-400'
          onClick={()=>setauth('Login')}>
            Login
          </div>
         </div>
      </div>
    </div>
  )
}

export default Registerform