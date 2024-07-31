import React from "react";
import '../assets/css/signup.css';

export const Signup = ({setShowComponent}) => {
    return(
        <>
                <form action="" className="signup-form">
                    <input type="email" name="useremail" placeholder="Enter Your Email" className="sign-input" required/><br />
                    <input type="text" name="phone_number" placeholder="Enter Your Phone Number" className="sign-input" required/><br />
                    <input type="text" name="userpassword" placeholder="Enter Your Password" className="sign-input" required/><br />
                    <input type="submit" className="sign-submit" value="SIGN IN"/>
                </form>
                <p className="login-link" onClick={() => setShowComponent(false)}>Don't have an account?</p>
            </>
    )
}