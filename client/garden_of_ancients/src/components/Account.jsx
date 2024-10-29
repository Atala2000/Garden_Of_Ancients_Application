import React, {useState, useEffect} from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { useAuth } from "./Authprovider";
import '../assets/css/Account.css'

export const Account = ({loginDisplay}) => {
    const {isAuthenticated, isLoading} = useAuth();
    const [showComponent, setShowComponent] = useState(false);


    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }
    
    if(isAuthenticated){
        return null;
    }

    return(
        <div className="account-form" style={loginDisplay}>
        {showComponent ? <Signup setShowComponent={setShowComponent}/> : <Login setShowComponent={setShowComponent}/>}
        </div>
    )
}