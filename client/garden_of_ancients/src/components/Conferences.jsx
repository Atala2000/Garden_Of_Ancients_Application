import React, {Component} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import imageURL from "../assets/events.jpeg";
import '../assets/css/Conference.css';
import cardOne from '../assets/meetings.jpeg';
import cardTwo from '../assets/rerceation.jpeg';
import { Heading } from "./Heading";
import { Footer } from "./Footer";
import { Cards } from "./Cards";

export const Conferences = () => {
    return(
    <>
    <Hero backgroundImage={imageURL}>
        <Navbar/>
        <Heading Text="Events: Give a scenic flare to your events, conferences and meetings"></Heading>
        <Booking/>
    </Hero>
    <div className="conference-body">
        <h3 className="conference-heading">Nested in this mini ‘rain forest’ is a conference facility equipped with modern facilities to cater for your needs.</h3>
        <p className="con-paragraph">Depending on the nature of your meeting, the facility can host 50-100 pax. The facility is surrounded with beautiful lawns and sitting areas suitable for reflective group work sessions. What about some events and activities such as family meetings, weddings, photography and video shooting?  Talk to us on any of these needs.
</p>
<div className="card-collection">
<Cards cardImage={cardOne} cardHead="Meetings" cardPar="Unwind in our havens of tranquility. Explore the unique features and amenities offered by each bedroom category, designed to cater to your every need."></Cards>
<Cards cardImage={cardTwo} cardHead="Events" cardPar="Unwind in our havens of tranquility. Explore the unique features and amenities offered by each bedroom category, designed to cater to your every need."></Cards>
</div>
    </div>
    <Footer/>
    </>
    )
}