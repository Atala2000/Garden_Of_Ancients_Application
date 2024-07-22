import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from './components/Home.jsx'
import { About } from './components/About.jsx'
import { Bedrooms } from './components/Bedrooms.jsx'
import { Conferences } from './components/Conferences.jsx'
import { Herbarium } from './components/Herbarium.jsx'
import { Hives } from './components/Hives.jsx'
import { Bookpage } from './components/bookPage.jsx'
import { Errormessage } from './components/404.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/About Us" element = {<About/>}/>
        <Route path= "/Bedrooms" element = {<Bedrooms/>}/>
        <Route path='/Conferences' element = {<Conferences/>}/>
        <Route path='/Herbarium' element = {<Herbarium/>}/>
        <Route path='/Hives' element = {<Hives/>}/>
        <Route path='/bookPage' element = {<Bookpage/>}/>
        <Route path='/404Error' element = {<Errormessage/>}/>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
