import React from "react";
import '../assets/css/Heading.css';


export const Heading = ({Text, text}) => {
    return(
        <>
        <h1 className="heading-style">
            {Text}
        </h1>
        <h2 className="sub-style">{text}</h2>
        </>
    )
}