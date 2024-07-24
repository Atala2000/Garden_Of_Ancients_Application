import React, {Component} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import imageURL from "../assets/conference.webp";
import '../assets/css/Conference.css';
import cardOne from '../assets/standalone.jpeg';
import cardTwo from '../assets/waccommodation.webp';
import { Heading } from "./Heading";
import { Footer } from "./Footer";
import { Cards } from "./Cards";

export const Conferences = () => {
    return(
    <>
    <Hero backgroundImage={imageURL}>
        <Navbar/>
        <Heading Text="Bedrooms: Where Comfort Meets Tranquility"></Heading>
        <Booking/>
    </Hero>
    <div className="conference-body">
        <h3 className="conference-heading">Imagine waking up to lush gardens. At Garden of Ancients, our havens offer more than just a place to sleep. Explore a range of exquisitely designed bedrooms, each catering to your specific desires.</h3>
        <p className="con-paragraph">Unwind in spacious luxury suites, featuring (mention key features, e.g., king-size beds, private balconies, soaking tubs).  Reclaim tranquility in our cozy garden cottages, perfect for (mention ideal guest for this type of room, e.g., romantic getaways, solo retreats).
Indulge in the finest amenities, including (mention a few key amenities, e.g., plush linens, high-speed Wi-Fi, premium toiletries).  Find your perfect sanctuary at Garden of Ancients.
</p>
<div className="card-collection">
<Cards cardImage={cardOne} cardHead="Standalone" cardPar="Unwind in our havens of tranquility. Explore the unique features and amenities offered by each bedroom category, designed to cater to your every need."></Cards>
<Cards cardImage={cardTwo} cardHead="With Accommodation" cardPar="Unwind in our havens of tranquility. Explore the unique features and amenities offered by each bedroom category, designed to cater to your every need."></Cards>
</div>
    </div>
    <Footer/>
    </>
    )
}