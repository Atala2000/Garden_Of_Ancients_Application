import React, {Component} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import imageURL from "../assets/entrance.jpeg";
import cardOne from '../assets/conference.webp';
import cardTwo from '../assets/bedroom.jpeg';
import cardThree from '../assets/herbarium.jpg';
import cardFour from '../assets/bees.jpg';
import { Cards } from "./Cards";
import { Footer } from "./Footer";
import '../assets/css/Home.css'
import { Heading } from "./Heading";

export const Home = () => {

    return(
        <>
            <Hero backgroundImage={imageURL}>
                <Navbar/>
                <Heading Text="Garden Of Ancients" text="Resort"></Heading>
                <Booking/>
            </Hero>
            <div className="home-body">
                <div className="mid-home">
                    <div className="mid-par">
                        <h1>Unveiling the Legacy: A Story Steeped in History</h1>
                        <p>Discover the rich history and philosophy behind our unique resort. Immerse yourself in a timeless haven where nature and tranquility reign supreme. Learn about our commitment to sustainability and cultural preservation.</p>
                    </div>
                    <div className="mid-pic"></div>
                </div>
                <h1 className="heading-card">What We Offer</h1>
                <div className="card-collection">
                <Cards cardImage={cardOne} cardHead="Bedrooms" cardPar="Unwind in our havens of tranquility. Explore the unique features and amenities offered by each bedroom category, designed to cater to your every need."></Cards>
                <Cards cardImage={cardTwo} cardHead="Conference Facilities" cardPar="Host a productive and memorable gathering in our state-of-the-art conference rooms. Exceptional services available"></Cards>
                <Cards cardImage={cardThree} cardHead="Herbarium" cardPar="Embark on a fragrant journey through our meticulously curated herbarium. Discover a world of medicinal and culinary plants, and delve into their historical and practical uses."></Cards>
                <Cards cardImage={cardFour} cardHead="Bee Hives" cardPar="Witness the fascinating world of beekeeping firsthand. Learn about our commitment to sustainable practices and the honey produced by our resident bees."></Cards>
                </div>
            </div>
            <Footer/>
        </>
    )
}