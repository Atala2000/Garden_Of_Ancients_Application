import React, {Component} from "react";
import { Hero } from "./Hero";
import imageURL from '../assets/spice.jpeg';
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import { Heading } from "./Heading";
import "../assets/css/Herbarium.css";

export const Herbarium = () => {
    return(
        <>
        <Hero backgroundImage={imageURL}>
            <Navbar/>
            <Heading Text='Spice Enclave'/>
            <Booking/>
        </Hero>
        <div className="mid-herb">
                    <div className="herb-par">
                        <h1>Unveiling the Legacy: A Story Steeped in History</h1>
                        <p>Discover the rich history and philosophy behind our unique resort. Immerse yourself in a timeless haven where nature and tranquility reign supreme. Learn about our commitment to sustainability and cultural preservation.</p>
                    </div>
                    <div className="herb-pic"></div>
                </div>
        <Footer/>
        </>
    )
}