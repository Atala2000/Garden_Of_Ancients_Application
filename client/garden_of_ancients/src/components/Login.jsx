import React from "react";
import '../assets/css/login.css'

export const Login = ({setShowComponent}) => {

        return(
            <>
                <form action="" className="login-form">
                    <input type="email" name="useremail" placeholder="Enter Your Email" className="login-input" required/>
                    <br/>
                    <input type="text" name="userpassword" placeholder="Enter Your Password" className="login-input" required/><br />
                    <input type="submit" className="login-submit" value="LOG IN"/>
                </form>
                <p className="sign-link" onClick={() => setShowComponent(true)}>Don't have an account?</p>
            </>
        )
    
}