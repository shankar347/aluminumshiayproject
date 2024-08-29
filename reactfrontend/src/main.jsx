import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alumnincontext from './view/components/alumincontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
    <BrowserRouter>
    <ToastContainer/>
    <Alumnincontext>
    <App /> 
    </Alumnincontext>
    </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
