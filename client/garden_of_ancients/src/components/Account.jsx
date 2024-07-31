import React, {useState, useEffect} from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { useAuth, Authprovider } from "./Authprovider";
import '../assets/css/Account.css'

export const Account = () => {
    const {isAuthenticated} = useAuth() || {};
    const [showComponent, setShowComponent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false)
    }, [isAuthenticated]);


    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }
    else{
        return(
            <div className="account-form">
            {showComponent ? <Signup setShowComponent={setShowComponent}/> : <Login setShowComponent={setShowComponent}/>}
            </div>
        )
    }
}