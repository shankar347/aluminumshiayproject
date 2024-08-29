import React, { useContext, useState } from 'react'
import { alumnincontext } from './alumincontext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useratom from '../atoms/useratom'

const Navbar = () => {
   
  const user=useRecoilValue(useratom)
    const [bar1,setbar1]=useState(false)
    const [bar2,setbar2]=useState(false)
    const [bar3,setbar3]=useState(false)
    const [bar4,setbar4]=useState(false)
    const {isopen,setisopen,aboutref,contactref}=useContext(alumnincontext)
    const setprofile=()=>{
      setbar4(true)
      setisopen(true)
    }
    const navigate=useNavigate()
    const scorollintoview=(ref)=>{
      if(!currentlocation)
      {
       navigate('/')
       ref?.current?.scrollIntoView({behavior:"smooth",
        block:"center"})
      }
      ref?.current?.scrollIntoView({behavior:"smooth",
        block:"center"})
    }
    const location=useLocation()
    const currentlocation=location.pathname === "/"
    const navigater=useNavigate()
  return (  
   <div className='flex 
   h-16 items-center
    headertag  navbar justify-between'>
    <div  className='headers font-bold 
    pl-10 font-poppins text-2xl'>
       Alumipro
    </div>
     <div className='flex pr-10 gap-10 font-medium'>
    <div className='flex  flex-col items-center justify-center
     '>
    <div className='cursor-pointer'
      onClick={()=>navigater(`/alum-detail`)}
      onMouseOver={()=>setbar1(true)}
      onMouseLeave={()=>setbar1(false)}>
     Dashboard 
    </div>
    <div className={`bar  ${bar1 ? "baractive": ""}`}>
        </div>
        </div>
    <div>
    <div  className='cursor-pointer'
      onClick={()=>scorollintoview(aboutref)}
      onMouseOver={()=>setbar2(true)}
      onMouseLeave={()=>setbar2(false)}>
        About us
    </div>
    <div className={`bar ${bar2 ? "baractive": ""}`}>
            </div>
            </div>
            <div>
    <div  className='cursor-pointer'
      onMouseOver={()=>setbar3(true)}
      onClick={()=>scorollintoview(contactref)}
      onMouseLeave={()=>setbar3(false)}>
       Contact us
    </div>
    <div className={`bar ${bar3 ? "baractive": ""}`}>
            </div>
            </div>
            <div>

    {
      currentlocation ?   <div  className='cursor-pointer'
      onMouseOver={setprofile}
      onClick={()=>setisopen(true)}
      onMouseLeave={()=>setbar4(false)}>
    Profile
    </div>  :   <div  className='cursor-pointer'
      // onMouseOver={setprofile}
      onMouseOver={()=>setbar4(true)}
      onClick={()=>navigate('/')}
      onMouseLeave={()=>setbar4(false)}>
     Home
    </div>  
    }             
   
    <div className={`bar ${bar4 ? "baractive": ""}`}>
            </div>
            </div>
    </div>
   </div>
  )
}

export default Navbar