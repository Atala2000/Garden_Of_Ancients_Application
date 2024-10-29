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
                        <p>Almost everyone loves good spiced food. Most people love herbal drinks. Experience the many spices grown in the Spice Enclave within this Garden. Have you seen how these spices - nutmeg, cloves, cinnamon, mints, vanilla, sage, thymes, and many, many others, look like? And there are many fruit trees you have probably never seen in your life! They are all here in the Spice Enclave! Whether adult or school student, you will benefit greatly from an educational tour in the Spice Enclave. It is a place like no other!</p>
                    </div>
                    <div className="herb-pic">
                        <div className="herb-pic1"></div>
                        <div className="herb-flex">
                            <div className="herb-pic2"></div>
                            <div className="herb-pic3"></div>
                        </div>
                    </div>
                </div>
        <Footer/>
        </>
    )
}