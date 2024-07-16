import React, {Component} from "react";
import { Hero } from "../Hero";
import { Navbar } from "../Navbar";
import { Booking } from "../Booking";

export const Home = () => {
    return(
        <>
            <Hero>
                <Navbar/>
                <Booking/>
            </Hero>
        </>
    )
}