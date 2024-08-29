import React, { useContext } from 'react'
import { alumnincontext } from './alumincontext'
import { FaEnvelope, FaPhoneAlt, FaUser } from 'react-icons/fa'
import { useRecoilState, useRecoilValue } from 'recoil'
import useratom from '../atoms/useratom'
import { toast } from 'react-toastify'

const Profilemodel = () => {
 
    const {isopen,setisopen} =useContext(alumnincontext)
    const [user,setuser]=useRecoilState(useratom)
    // console.log(user)
    
    

    const handlelogout=async()=>{
        try{
          let token=user?.token
        //   console.log(token)
          if (!token)
         {
            toast.error('No token found. Please log in.');
            return;  
         }
          const res=await fetch(`/api/logout/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
          if (!res.ok) {
            const errdata = await res.text()
            if (errdata) {
                toast.error(`Logout failed: ${errdata.error}`);
            } else {
                toast.error('Logout failed with an unknown error');
            }
            return;
        }
          const data=await res.text()
          console.log(data)
          localStorage.removeItem('token')
          setuser(null)
          toast.success('Logged out successfully')
          setisopen(false)
        }
        catch(err)
        {
            console.log(err)
        }
    }

  return (
   <>
   {
    isopen && <div className='flex flex-col bg-white w-[400px]
    h-[280px] profilebox 
    absolute top-2 rounded  right-5 bgprofile z-index-10 h-500'>
    <div className='flex flex-col'>
        <div className='text-lg mt-2 font-medium text-center
        text-red-600 font-sans mb-8'>
            Profile
        </div>
        <div className='flex gap-5 
         font-medium profileicon pb-3 pl-10 items-center'>
            <FaUser />
            <div className='text-black'>
                 {user?.name}
            </div>
        </div>
        <div className='flex gap-5 pl-10  
        font-medium pb-3 items-center
        profileicon'>
            <FaEnvelope/>
            <div className='text-black'>
                 {user?.email}
            </div>
        </div>
        <div className='flex gap-5 pl-10 
         font-medium 
         profileicon items-center'>
            <FaPhoneAlt/>
            <div className='text-black'>
                 {user?.phone_no}
            </div>
        </div>
        <div className='flex items-center mx-auto mt-14
        gap-5'>
         <div 
         onClick={()=>setisopen(false)}
         className='w-32 
         cursor-pointer text-black
         rounded-lg  hover:bg-red-200
         h-10 flex items-center justify-center bg-red-300'>
           cancel
         </div>
         <div className='w-32 bg-blue-300
         cursor-pointer hover:bg-blue-200
         rounded-lg text-black
         h-10 flex items-center justify-center'
         onClick={handlelogout}>
            Logout
         </div>
        </div>
    </div>
    </div>
   }
   </>
  )
}

export default Profilemodel