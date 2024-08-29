import React from 'react'
import Registerform from './register'
import { useRecoilValue } from 'recoil'
import authatom from '../atoms/authatom'
import Login from './login'

const Auth = () => {
  const auth=useRecoilValue(authatom)
  return (
    <>
     {
      auth === "Login" ? <Login/> :
      <Registerform/>
     }
    </>
  )
}

export default Auth