import React, {Component, useEffect, useState} from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import conPic from '../assets/con3.jpeg';
import roomPic from '../assets/room1.jpeg';
import enclavePic from '../assets/enclave1.jpeg';
import cardOne from '../assets/recreation.jpeg';
import cardTwo from '../assets/events.jpeg';
import cardThree from '../assets/spiceenclave.jpeg';
import cardFour from '../assets/beegarden.jpeg';
import { Cards } from "./Cards";
import { Footer } from "./Footer";
import '../assets/css/Home.css'
import { Heading } from "./Heading";
import { Account } from "./Account";
import { Excel } from "./Excel";
import { useAuth } from "./Authprovider";

export const Home = () => {

    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const [accountStyle, setAccountStyle] = useState({});
    const [headDivStyle, setHeadDiveStyle] = useState({});

    const homeStyle = {
        backgroundImage : `url(${enclavePic}) , url(${conPic}), url(${roomPic})`,
        backgroundPosition : 'left, center, right',
        backgroundSize : '33.33% 100%',
        backgroundRepeat : 'no-repeat'
    }


    useEffect(() => {
        const checkAccount = () => {
            if(isAuthenticated){
                setHeadDiveStyle({width : '100%', textAlign : 'center', marginLeft : '0' });
            }
            else{
                setHeadDiveStyle({maxWidth : '50%'});
            }
        }
        checkAccount();
    }, [isAuthenticated])

    return(
        <>
            <Hero style={homeStyle}>
                <Navbar/>
                <div className="main-hero" style={{display : "flex"}}>
                    <div className="head-div" style={headDivStyle}>
                <h1 className="home-heading">Tsosy Garden of Ancients</h1>
                <h2 className="sub-head">Fusion of Recreation and Conservation</h2>
                <Excel/>
                </div>
                <Account/>
                </div>
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
                <Cards cardImage={cardOne} cardHead="Recreation" cardPar="Unwind in our havens of tranquility. Explore the unique features and amenities offered by each bedroom category, designed to cater to your every need."></Cards>
                <Cards cardImage={cardTwo} cardHead="Events" cardPar="Host a productive and memorable gathering in our state-of-the-art conference rooms. Exceptional services available"></Cards>
                <Cards cardImage={cardThree} cardHead="Spice Enclave" cardPar="Embark on a fragrant journey through our meticulously curated herbarium. Discover a world of medicinal and culinary plants, and delve into their historical and practical uses."></Cards>
                <Cards cardImage={cardFour} cardHead="Bee Garden" cardPar="Witness the fascinating world of beekeeping firsthand. Learn about our commitment to sustainable practices and the honey produced by our resident bees."></Cards>
                </div>
            </div>
            <Footer/>
        </>
    )
}