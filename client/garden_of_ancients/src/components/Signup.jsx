import React, {useState} from "react";
import '../assets/css/signup.css';

export const Signup = ({setShowComponent}) => {

    const [formData, setFormData] = useState({
        useremail : '',
        phone_number: '',
        userpassword : ''
    })


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData));
        const response = await fetch('http://192.168.100.10:5500/api/signup', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify(formData)
        })
        const signAnswer = await response.json();

        if(response.ok){
            console.log(signAnswer);
        }
    }
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    return(
        <>
                <form onSubmit={handleSubmit} className="signup-form">
                    <input type="email" name="useremail" placeholder="Enter Your Email" className="sign-input" value={formData.useremail} onChange={handleChange} required/><br />
                    <input type="text" name="phone_number" placeholder="Enter Your Phone Number" className="sign-input" value={formData.phone_number} onChange={handleChange} required/><br />
                    <input type="text" name="userpassword" placeholder="Enter Your Password" className="sign-input" value={formData.userpassword} onChange={handleChange} required/><br />
                    <input type="submit" className="sign-submit" value="SIGN UP"/>
                </form>
                <p className="login-link" onClick={() => setShowComponent(false)}>Back to login</p>
            </>
    )
}