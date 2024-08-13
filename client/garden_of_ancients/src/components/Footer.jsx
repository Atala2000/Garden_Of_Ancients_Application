import React from "react";
import '../assets/css/Footer.css';
import {Facebook, Twitter, Instagram, Whatsapp} from 'react-bootstrap-icons';

export const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-container">
            <div className="title">
                <h2>Garden of Ancients</h2>
                <div className="socials">
                    <a href="">
                    <Facebook style={{color:'white'}}/>
                    </a>
                    <a href="">
                    <Twitter style={{color:'white'}}/>
                    </a>
                    <a href="">
                    <Instagram style={{color:'white'}}/>
                    </a>
                    <a href="">
                   <Whatsapp style={{color:'white'}}/>
                    </a>
                </div>
            </div>
            <div className="address">
                <h4>Reservations Office</h4>
                <p>Nyamira, Kenya<br/>
                PO Box 1753 00502
                </p>
                <p>0710943451</p>
                <p>info.gardenofancients@co.ke</p>
            </div>
            <div className="availability">
                <h4>Office Hours</h4>
                <p>Monnday to Friday<br/>
                9.00am to 5.00pm
                </p>
                <p>Saturday<br/>
                9.00am to 12.00pm
                </p>
            </div>
            </div>
        </footer>
    )
}