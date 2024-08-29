import React, { useContext } from 'react'
import { useRecoilValue } from 'recoil'
import useratom from '../atoms/useratom'
import bannner from '../../assets/img3.jpg'
import indialogo from '../../assets/square.png'
import instagram from '../../assets/instagram.png'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'
import gmail from '../../assets/gmail.png'
import github from '../../assets/github.png'
import Profilemodel from './profilemodel'
import { alumnincontext } from './alumincontext'

const Homepage = () => {
  const user=useRecoilValue(useratom)
  const {isopen,setisopen,aboutref,contactref}=useContext(alumnincontext)
  // console.log(user)
  
  return (
    <div className='flex flex-col'>
      <div className='banner relative relative'>
       <img src={bannner} alt=""  className='
       w-full  h-[95vh] ' 
      //  loading='lazy'
       />
       <div className='text-white
       absolute font-poppins herotag 
       flex flex-col gap-40 z-index-5 left-10 top-20'>
       <div className='flex flex-col gap-14  
        text-5xl ' >
       <div className='text-5xl'>
        Revolutionizing Aluminium
        </div>
        <div>
          Maunufacturing by
        </div>
        <div>
          Artificial Intelligence
        </div>
       </div>
       <div className='herodestag font-poppins text-xl
       w-[100%] flex flex-col mt-5 gap-5'>
      <div>
      Optimize Aluminum Manufacturing with Cutting-Edge Predictive Analytics.
      </div>
      <div className=''>
      Enhance Efficiency, Reduce Costs, and Maximize Output with Data-Driven Insights.
      </div>
       </div>
       </div>
       <Profilemodel />
      </div>
      <div>
        <div className='flex flex-col'>
         <div className='text-xl pl-3 pt-2
          font-medium' ref={aboutref}>
          About us
         </div>
         <div className='flex flex-col px-3 mt-2 gap-3'>
          <div>
          Welcome to Alumipro, where we specialize in revolutionizing 
          the aluminum manufacturing industry through the power of predictive analytics. Our mission is to enhance efficiency, reduce operational costs, and maximize output consistency by harnessing data-driven insights and advanced statistical techniques.  
          </div>
          <div>
          Founded on the belief that innovation and technology can
           transform traditional industries, we have developed state-of-the-art models that predict the precise quantities of materials required in production processes. This capability not only accelerates production but also ensures optimal resource utilization and minimizes waste, enabling companies
           to maintain a competitive edge in the market.
          </div>
          <div>
          Our team consists of experts in data science, manufacturing, and business strategy, all dedicated to delivering solutions that integrate seamlessly into existing operational workflows. By embedding predictive analytics into core business operations, we help organizations unlock new efficiencies, improve responsiveness to market demands, and drive sustainable growth.
          </div>
          <div>
          At Alumipro, we are committed to continuous innovation and excellence. As the industry evolves, we remain at the forefront, advancing our methodologies to ensure that our clients are equipped to navigate the dynamic landscape of aluminum manufacturing with agility and foresight.
          </div>
          <div>
          Join us on this journey to transform the future of manufacturing with data-driven decision-making and resource optimization.
          </div>
         </div>
        </div>
 
      </div>
    <div  className='flex flex-col mt-3'>
   <div className='flex flex-col items-center 
   justify-center' ref={contactref}>
   <div className='text-xl pt-5
          font-medium text-center'>
        Contact us
      </div>
      <div className={`bar1 baractive`}>
            </div>
   </div>
   <div className='flex flex-col items-center
   '>
    <div className='flex flex-col '>
    <div className='flex gap-2 text-center items-center mt-5
   '>
          <img src={indialogo} 
     className='w-5 h-5 rounded' />
            <div className='text font-md font-medium'>
              +91 9363360016
            </div>
          </div>
          <div className='flex mt-3 gap-3 items-center '>
            <img src={gmail} alt="" 
             className='w-5 h-5  cursor-pointer'
             />
             <div className='font-medium'>
              sivaaadi96@gmail.com
             </div>
          </div>
          <div className='flex mt-3 gap-3 items-center '>
            <img src={github} alt="" 
             className='w-5 h-5  cursor-pointer'
             />
             <div className='font-medium'>
             github.com/shankar347
             </div>
          </div>
    </div> 

          <div className='flex gap-2 mt-7 pb-5'>
           <img src={instagram} alt="" className='w-6 h-6  cursor-pointer'/>
           <img src={facebook} alt=""  className='w-6 h-6 cursor-pointer'/>
           <img src={twitter} alt=""  className='w-6 h-6 cursor-pointer' />
          </div> 
   </div>
    </div>
    </div>
  )
}

export default Homepage