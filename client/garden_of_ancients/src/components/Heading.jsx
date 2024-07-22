import React from "react";
import '../assets/css/Heading.css';


export const Heading = ({text}) => {
    return(
        <h1 className="heading-style">
            {text}
        </h1>
    )
}