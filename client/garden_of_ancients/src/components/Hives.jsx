import React, {Component} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Booking } from "./Booking";
import { Heading } from "./Heading";
import imageURL from '../assets/bee.jpeg';
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
                        <p>Kept in a well secluded place within the Tsosy Garden of Ancients is a Bee Garden, comprising open beehives of different types and a bee house. You will be able to safely view millions of these important insects, without which our global food production would be in jeopardy. Within close proximity to the Bee Garden are beautiful orchards and flowers from where the bees derive nectar, and whenever available, you will be able to purchase our premium honey, perhaps not found anywhere else on the globe. Why? Here we feed the bees with the best, they in turn feed us with the best honey! Ever heard on how bees communicate? Come and learn it here!</p>
                    </div>
                    <div className="hive-pic">
                    <div className="hive-pic1"></div>
                        <div className="hive-flex">
                            <div className="hive-pic2"></div>
                            <div className="hive-pic3"></div>
                        </div>
                    </div>
                </div>
        <Footer/>
        </>
    )
}