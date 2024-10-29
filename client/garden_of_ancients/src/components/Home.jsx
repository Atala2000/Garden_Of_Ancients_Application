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
import { useLayoutEffect } from "react";
import { Excel } from "./Excel";
import { Logout } from "./Logout";
import { useNavigate } from "react-router-dom";
import { List } from "react-bootstrap-icons";
import { useAuth } from "./Authprovider";

export const Home = () => {

    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const [accountStyle, setAccountStyle] = useState({});
    const [headDivStyle, setHeadDiveStyle] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);

    const homeStyle = {
        backgroundImage : `url(${enclavePic}) , url(${conPic}), url(${roomPic})`,
        backgroundPosition : 'left, center, right',
        backgroundSize : '33.33% 100%',
        backgroundRepeat : 'no-repeat'
    }

    const navigate = useNavigate();
    const recCard = () => {
        navigate('/Bedrooms');
        window.scrollTo(0, 0);
    }
    const conCard = () => {
        navigate('/Conferences');
        window.scrollTo(0, 0);
    }
    const herbCard = () => {
        navigate('/Herbarium');
        window.scrollTo(0, 0);
    }
    const hiveCard = () => {
        navigate('/Hives');
        window.scrollTo(0, 0);
    }


    useEffect(() => {
        const checkAccount = () => {
            if (isAuthenticated) {
                setHeadDiveStyle({ width: '100%', textAlign: 'center', marginLeft: '0' });
                console.log("Style set: Authenticated");
            } else if (!isAuthenticated && window.innerWidth > 450) {
                setHeadDiveStyle({ maxWidth: '50%' });
                console.log("Style set: Not Authenticated, Width > 425");
            } else if (!isAuthenticated && window.innerWidth <= 450) {
                setHeadDiveStyle({ width: '100%', textAlign: 'center', marginLeft: '0' });
                console.log("Style set: Not Authenticated, Width <= 425");
            }
        }
        checkAccount();
        const handleResize = () => {
            checkAccount();
          };
        
          window.addEventListener('resize', handleResize);
        
          return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, [isAuthenticated])

    let loginStyle ={};
    if(loginStatus){
        loginStyle = {display : 'block'}
    }
    else if(!loginStatus && window.innerWidth <= 450){
        loginStyle = {display : 'none'}
    }

    return(
        <>
            <Hero style={homeStyle}>
                
                <Navbar/>
                <div className="main-hero">
                    <div className="head-div" style={headDivStyle}>
                <h1 className="home-heading">Tsosy Garden of Ancients</h1>
                <h2 className="sub-head">Fusion of Recreation and Conservation</h2>
                <Excel/>
                <Logout/>
                </div>
                <Account loginDisplay={loginStyle}/>
                </div>
                {!isAuthenticated && window.innerWidth < 450 && <p onClick={() => {setLoginStatus(!loginStatus)}} className="login-toggle">Log in to access book page</p>}
                <Booking/>
            </Hero>
            <div className="home-body">
                <div className="mid-home">
                    <div className="mid-par">
                        <h1>Unveiling the Legacy:</h1>
                        <p>Discover the rich history and philosophy behind our unique resort. Immerse yourself in a timeless haven where nature and tranquility reign supreme. Learn about our commitment to sustainability and cultural preservation.</p>
                    </div>
                    <div className="mid-pic"></div>
                </div>
                <h1 className="heading-card">What We Offer</h1>
                <div className="card-collection">
                <Cards cardLink={recCard} cardImage={cardOne} cardHead="Recreation" cardPar="With the tranquility around here, it is a place to relax around with friends and family..."></Cards>
                <Cards cardLink={conCard} cardImage={cardTwo} cardHead="Events" cardPar="Nested in this mini ‘rain forest’ is a conference facility equipped with modern facilities to cater for your needs..."></Cards>
                <Cards cardLink={herbCard} cardImage={cardThree} cardHead="Spice Enclave" cardPar="Almost everyone loves good spiced food. Most people love herbal drinks. Experience the many spices grown in the Spice Enclave within this Garden..."></Cards>
                <Cards cardLink={hiveCard} cardImage={cardFour} cardHead="Bee Garden" cardPar="Kept in a well secluded place within the Tsosy Garden of Ancients is a Bee Garden, comprising open beehives of different types and a bee house..."></Cards>
                </div>
            </div>
            <Footer/>
        </>
    )
}