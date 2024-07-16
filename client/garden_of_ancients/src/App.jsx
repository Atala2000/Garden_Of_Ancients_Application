import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from './components/Pages/Home.jsx'
import { About } from './components/Pages/About.jsx'
import { Bedrooms } from './components/Pages/Bedrooms.jsx'
import { Conferences } from './components/Pages/Conferences.jsx'
import { Herbarium } from './components/Pages/Herbarium.jsx'
import { Hives } from './components/Pages/Hives.jsx'
import { Bookpage } from './components/Pages/bookPage.jsx'
import { Errormessage } from './components/Pages/404.jsx'

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
