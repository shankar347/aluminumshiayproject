import { Navigate, Route, Router, Routes, useLocation } from "react-router-dom"
import Auth from "./view/auth/auth"
import { useRecoilValue } from "recoil"
import useratom from "./view/atoms/useratom"
import Homepage from "./view/components/homepage"
import Navbar from "./view/components/navbar"
import Uploadalum from "./view/components/uploadalum"
import Profilemodel from "./view/components/profilemodel"


function App() {
  
  const user=useRecoilValue(useratom)
  const location=useLocation()  
  const location1=location.pathname
  console.log(location1)
  return (
    <div style={{userSelect:'none'}}>
    {location1 === "/auth" ? '': <Navbar/> } 
    <div className="relative">
    {/* <Profilemodel /> */}
    <Routes>
      <Route path="/" element={user ? <Homepage/> : 
      <Navigate to={'/auth'} />} />
      <Route path="/auth" element={!user ? <Auth/> :
      <Navigate to={'/'} />} />
      <Route path="/alum-detail"
      element={user ? <Uploadalum/> : 
        <Navigate to={'/auth'} />} />
    </Routes>
      
    </div>
    </div>
  )
}

export default App
