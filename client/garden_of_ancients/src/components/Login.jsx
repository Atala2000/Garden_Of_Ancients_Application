import React, {useState} from "react";
import '../assets/css/login.css';

export const Login = ({setShowComponent}) => {

    const [formData, setFormData] = useState({
        useremail : '',
        userpassword : ''
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5500/api/login", {
            method : 'POST', 
            headers : {"Content-Type" : "application/json"},
            credentials : 'include',
            body : JSON.stringify(formData)
        });
        const data = await response.json();
        if(!response.ok){
            console.log("Login Failed", data);
        }
        window.location.reload();
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

        return(
            <>
                <h3 className="log-head">LOGIN TO ACCESS BOOKING PAGE</h3>
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="email" name="useremail" placeholder="Enter Your Email" className="login-input" value={formData.useremail} onChange={handleChange} required/>
                    <br/>
                    <input type="text" name="userpassword" placeholder="Enter Your Password" className="login-input" value={formData.userpassword} onChange={handleChange} required/><br />
                    <input type="submit" className="login-submit" value="LOG IN"/>
                </form>
                <p className="sign-link" onClick={() => setShowComponent(true)}>Don't have an account?</p>
            </>
        )
    
}