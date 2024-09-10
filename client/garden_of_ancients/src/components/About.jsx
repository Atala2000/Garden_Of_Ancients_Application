import React, {Component} from 'react';
import { Hero } from './Hero';
import { Footer } from './Footer';
import { Heading } from './Heading';
import { Booking } from './Booking';
import imageURL from '../assets/about.jpeg';
import { Navbar } from './Navbar';
import '../assets/css/About.css';

export const About = () => {
    return(
        <>
        <Hero backgroundImage={imageURL}>
            <Navbar/>
            <Heading Text='About Us'/>
            <Booking/>
        </Hero>
        <div className="about-body">
            <h3 className="about-head">With the tranquility around here, it is a place to relax around with friends and family.</h3>
            <p className="aboutpage-body">You can choose to carry something to eat or with prior arrangement, get the Garden management to have this figured out for you according to your preferences. Camping is also possible for sizeable groups. Speak to us for all assistance. You may also wish to just come and rewind in these gardens where basic accommodation is available for small groups of up to 10 people. You can come individually or as a group with prior booking. 
</p>
        </div>
        <Footer/>
        </>
    )
}