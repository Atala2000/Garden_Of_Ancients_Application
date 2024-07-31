import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const Authprovider = ({children}) => {
    const [isAuthenticated, setIsAuthneticated] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('http://localhost:5500/api/checkSession');
            setIsAuthneticated(response.data.isAuthenticated);
            console.log('isAuthenticated:', isAuthenticated);
        }
        checkSession();
    }, []);

    return(
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )

    
}

export const useAuth = () => {
    return(
        useContext(AuthContext)
    )
}

