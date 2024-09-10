import React, {Component} from "react";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import { Heading } from "./Heading";

export const Herbarium = () => {
    return(
        <>
        <Hero>
            <Navbar/>
            <Heading Text='Spice Enclave'/>
            <Booking/>
        </Hero>
        <Footer/>
        </>
    )
}