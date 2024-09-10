import React, {Component} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Booking } from "./Booking";
import { Heading } from "./Heading";
import imageURL from '../assets/bees.jpg';
import "../assets/css/Hives.css";

export const Hives = () => {
    return(
        <>
        <Hero backgroundImage={imageURL}>
            <Navbar/>
            <Heading Text='Bee Garden'/>
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