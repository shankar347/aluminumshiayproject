import React, { act, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import useratom from '../atoms/useratom'
import { useRecoilValue } from 'recoil'
// import Heatmap from './heatmap'
import Heatmapchart from './heatmap'

const Uploadalum = () => {

 const [isfocused1,setisfocused1]=useState(false)
 const [isfocused2,setisfocused2]=useState(false)
 const [isfocused3,setisfocused3]=useState(false)
 const [isfocused4,setisfocused4]=useState(false)
//  console.log(isfocused1)
 const [startdate,setstartdate]=useState('')
 const [enddate,setenddate]=useState('')
 const user=useRecoilValue(useratom)
 const predref=useRef(null)
 
 const [actions,setacions]=useState({
  material_type:'',
  quantity_required:'',
  date_range:0
 })
//  console.log(user)


const handletimediff=(startdate,enddate)=>{
  const start=new Date(startdate)
  const end=new Date(enddate)
  // console.log(start>end)
  if (start > end){
  return toast.error('Start date should be less than end date')
  }
  const timedif=end-start
  // console.log(timedif)  
  const daysdif=Math.ceil(timedif/((1000 * 3600 * 24)))
  return daysdif  
 }
 const token=user?.token
 const [recomendations,setrecommendations]=useState(null)
 console.log(recomendations)

 useEffect(()=>{
  if (startdate && enddate)
  {
  
  let diff= handletimediff(startdate,enddate)
   setacions((prevaction)=>({
    ...prevaction,
    date_range:diff
   }))  
  }
 },[startdate,enddate])


 const [pred,setpred]=useState(null)
//  let pred5digigts=Number(pred?.predection?.toFixed(3))
let predbig=pred?.predection.toString()
let totalpred=predbig?.slice(0,2)
let pointpred=predbig?.slice(3,5)   
// console.log(pred5digigts)
//  console.log(pred?.predection)
//  console.log(token)
//  console.log(actions)
const [data,setdata]=useState(null)

// const [pred1,setpred1]=useState(null)
//  let pred5digigts=Number(pred?.predection?.toFixed(3))
let predbig1=recomendations?.predicted_quality.toString()
let totalpred1=predbig1?.slice(0,2)
let pointpred1=predbig1?.slice(3,5)  

const [selectedtype,setselectedtype]=useState(['Alloy','Pure','Composite'])

useEffect(()=>{
 const getdata=async()=>{
  try{
    const res=await fetch('/api/data/',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    const data=await res.json()
    setdata(data?.data)
    // console.log(data?.data)
   }
   catch(err)
   {
     console.log(err)
   }
 }
 getdata()
},[])

 const handlepredictalum=async()=>{
  
  if (!actions.material_type || 
    !actions.quantity_required ||
    !actions.date_range 
  )
  {
    return toast.error('Please fill all the fields')
  }
  


   try{
    const res=await fetch('/api/predict/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
         'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify(actions)
    })
    if (!res.ok)
    {
      const errdata=await res.json()
      // console.log('errdata',errdata)
      toast.error('Invalid inputs')
      return
    }
    const data=await res.json()
    // console.log(data)

  
    // console.log(data)
    if (data?.predection < 70){
      let actions1={
        quantity_required:actions.quantity_required,
        date_range:actions.date_range,
        material_type:actions.material_type
      }
      const recres=await fetch('/api/recommend/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
           'Authorization': `Bearer ${token}`
      },
        body:JSON.stringify(actions1)
    })
    if (!recres.ok)
    {
      const recerrdata=await recres.json()
      console.log('recerrdata',recerrdata)
      return
    }
    const recdata=await recres.json()   
    setrecommendations(recdata?.recommendation[0])
    }
    setpred(data)
    if (predref.current)
    {
      predref.current.scrollIntoView({ behavior: 'smooth' })
    }
   }
   catch(err)
   {
    console.log(err)  
   }
 }

 const filterddata=data?.filter((item)=>(
  item?.material_type === actions.material_type
 ))
 
//  console.log(filterddata)

  return (
    <div className='flex w-[500px] mx-auto mt-10
     h-auto flex-col'>
     <div className='text-center 
     text-red-500 font-medium tex-lg'>
      Predection for Aluminium 
     </div>
     <div className='flex gap-1 
     mt-5'>
        <div className='text-red-600 text-lg font-medium
        '> 
            *
        </div>
     <div className='text-sm font-sans'>
     Unlock accurate aluminum quality and demand predictions 
     with our advanced form.
      Input your aluminum details and receive real-time
       insights to optimize production and inventory management.    
    </div> 
    </div>
    <div className='flex mt-10 flex-col'>
    <label htmlFor="
    " 
    className='text-md font-medium'>  
        Meterial Type
    </label>
      <select onClick={()=>setisfocused1(true)}
      onBlur={()=>setisfocused1(false)}
      onChange={(e)=>setacions({...actions,material_type:e.target.value})}
       name="" id="" 
      className={`mt-3 inputs
      rounded-md p-1  ${isfocused1 ? 'activeinput':
      ''}`}>  
        <option value=""
        disabled selected hidden> 
          Select Meterial
        </option>
        <option value="Alloy">
          Alloy    
        </option>
        <option value="Pure">
            Pure
        </option>
        <option value="Composite">
          Composite
        </option>
      </select>
    </div>
       <div  className='flex mt-10 flex-col'>
        <label htmlFor=""
        className='text-md font-medium'>
          Quantity Required
        </label>
        <input type="text"
        value={actions.quantity}
        onChange={(e)=>setacions({...actions,quantity_required:e.target.value})} 
        placeholder='Enter quantity'
        onClick={()=>setisfocused2(true)}
        onBlur={()=>setisfocused2(false)}
        className={`mt-3 inputs
          rounded-md p-1  ${isfocused2 ? 'activeinput':
          ''}`}/>
       </div>
       <div  className='flex mt-10  '>
        <div className='w-[50%] pr-3 flex flex-col'>
        <label htmlFor=""
        className='text-md font-medium'>
          Start date
        </label>
        <input type="date" 
          onClick={()=>setisfocused3(true)}
          onBlur={()=>setisfocused3(false)}
          className={`mt-3 inputs
            rounded-md p-1  ${isfocused3 ? 'activeinput':
            ''}`}
          value={startdate}
          onChange={(e)=>setstartdate(e.target.value)}  />
        </div>
        <div className='w-[50%] pl-3 flex flex-col'>
        <label htmlFor=""
        className='text-md font-medium'>
          End date
        </label>
          <input type="date"
          placeholder='select date'
          onClick={()=>setisfocused4(true)}
          onBlur={()=>setisfocused4(false)}
          className={`mt-3 inputs
            rounded-md p-1  ${isfocused4 ? 'activeinput':
            ''}`}
          value={enddate}
          onChange={(e)=>setenddate(e.target.value)}  />
        </div>
        <div>

        </div>
       </div>
    
    <div className='w-32 mt-10 mx-auto h-10 bg-red-400
    cursor-pointer hover:bg-red-300
    focus:bg-red-300 rounded-full 
    flex justify-center  items-center '
    onClick={handlepredictalum}>
        Predict 
    </div>
   {
    pred && <div className='flex  flex-col'>
            <div className='font-medium
             mt-5 text-md' 
             >
               Predictated Quality
            </div>
       <div className='flex gap-4 items-baseline'>
       <div className={`flex 
        ${totalpred > 85 ? 'text-green-600' : totalpred > 65 ?
          'text-yellow-700' : 'text-red-600'
        } 
        mt-2 ml-2 items-baseline`}> 
         <div className='flex text-4xl'>
           {totalpred} 
         </div>
         <div className='font text-md'>
          .{pointpred}
         </div>
        </div>
        <div className={`flex text-lg font-medium
          ${totalpred > 85 ? 'text-green-600' : totalpred > 65 ?
            'text-yellow-700' : 'text-red-600'
          } `}>
    {totalpred > 85 ? 'Good' : totalpred > 65 ?
          'Average' : 'Low'
        } 
    </div>
       </div>
    </div> 
   }
   {/* <div ref={predref} >

   </div> */}
     {
      pred ? <div>
        <div className='text-md font-medium mt-5'>
      Material Forecosts
     </div>
     <Heatmapchart data={filterddata}
     selectedtypes={selectedtype}/>
      </div> :
      <div className='h-[400px] w-full '
      ref={predref}>
      </div>
     }
    {
      recomendations ?  (<div>
      <div className='text-md  font-medium mt-5'>
      Recommended Material with quality
     </div>
     <div className='h-48 
     mt-2 text-lg flex items-baseline gap-2'>
     <div className='text-xl 
     text-gray-500 pl-2  font-medium'>
      {recomendations?.material_type}
     </div>
     <div className='flex gap-1 text-gray-600
     items-baseline ml-2'>
     <div className='flex text-3xl'>
           {totalpred1} 
         </div>
         <div className='font text-md'>
          .{pointpred1}
         </div>
     </div>
     </div>
     </div>) : ''
    }
    </div>
  )
}

export default Uploadalum