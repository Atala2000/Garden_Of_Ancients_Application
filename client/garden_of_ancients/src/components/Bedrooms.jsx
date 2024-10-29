import React, {Component} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import imageURL from "../assets/room1.jpeg";
import cardOne from '../assets/room3.jpeg';
import cardTwo from '../assets/camping.jpeg';
import cardThree from '../assets/recreation.jpeg';
import cardFour from '../assets/Tour.jpeg';
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
<div className="pic-collection">
    <div className="rec-pic1">
        <p className="hover-text">Bedrooms</p>
    </div>
    <div className="rec-pic2">
        <p className="hover-text">Picnics</p>
    </div>
    <div className="rec-pic3">
        <p className="hover-text">Camping</p>
    </div>
</div>
        </div>
        <Footer/>
        </>
    )
}