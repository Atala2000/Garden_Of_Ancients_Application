import React, {Component} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Booking } from "./Booking";
import { Heading } from "./Heading";

export const Hives = () => {
    return(
        <>
        <Hero>
            <Navbar/>
            <Heading Text='Bee Garden'/>
            <Booking/>
        </Hero>
        <Footer/>
        </>
    )
}