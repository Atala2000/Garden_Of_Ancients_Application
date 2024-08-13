import React, {Component} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import imageURL from "../assets/bedroom.jpeg";
import cardOne from '../assets/realsingle.webp';
import cardTwo from '../assets/doublebed.jpeg';
import '../assets/css/Bedrooms.css'
import { Heading } from "./Heading";
import { Cards } from "./Cards";
import { Footer } from "./Footer";

export const Bedrooms = () => {
    return(
        <>
        <Hero backgroundImage={imageURL}>
            <Navbar/>
            <Heading Text="Recreation: Where Comfort Meets Tranquility"></Heading>
            <Booking/>
        </Hero>
        <div className="bedroom-body">
            <h3 className="bed-head">With the tranquility around here, it is a place to relax around with friends and family.</h3>
            <p className="bed-body">You can choose to carry something to eat or with prior arrangement, get the Garden management to have this figured out for you according to your preferences. Camping is also possible for sizeable groups. Speak to us for all assistance. You may also wish to just come and rewind in these gardens where basic accommodation is available for small groups of up to 10 people. You can come individually or as a group with prior booking. 
</p>
<div className="card-collection">
<Cards cardImage={cardOne} cardHead="Bedroom" cardPar="Unwind in our havens of tranquility. Explore the unique features and amenities offered by each bedroom category, designed to cater to your every need."></Cards>
<Cards cardImage={cardTwo} cardHead="Camping" cardPar="Host a productive and memorable gathering in our state-of-the-art conference rooms. Exceptional services available"></Cards>
<Cards cardImage={cardTwo} cardHead="Picnic" cardPar="Host a productive and memorable gathering in our state-of-the-art conference rooms. Exceptional services available"></Cards>
<Cards cardImage={cardTwo} cardHead="Educational Tours" cardPar="Host a productive and memorable gathering in our state-of-the-art conference rooms. Exceptional services available"></Cards>
</div>
        </div>
        <Footer/>
        </>
    )
}