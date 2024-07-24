import react from 'react'
import { Navbar } from './Navbar'
import { Booking } from './Booking'
import { Heading } from './Heading'
import { Hero } from './Hero'
import imageURL from '../assets/bedroom.jpeg'
import { Footer } from './Footer'

export const Bookpage = () => {
    return(
        <>
        <Hero backgroundImage={imageURL}>
            <Navbar/>
            <Heading Text="Booking: Room Or Conference"/>
            <Booking/>
        </Hero>
        <div>

        </div>
        <Footer/>
        </>
    )
}