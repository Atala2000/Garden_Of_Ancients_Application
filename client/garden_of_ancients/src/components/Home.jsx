import React, {Component} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import imageURL from "../assets/teampic.jpg"

export const Home = () => {

    return(
        <>
            <Hero backgroundImage={imageURL}>
                <Navbar/>
                <Booking/>
            </Hero>
        </>
    )
}