import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const Authprovider = ({children}) => {
    const [isAuthenticated, setIsAuthneticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('http://localhost:5500/api/checkSession', {
                credentials : 'include'
            });
            const data = await response.json();
            setIsAuthneticated(data.isAuthenticated);
            console.log('isAuthenticated:', isAuthenticated);
            setIsLoading(false);
        }
        checkSession();
    }, []);

    return(
        <AuthContext.Provider value={{isAuthenticated, isLoading}}>
            {children}
        </AuthContext.Provider>
    )

    
}

export const useAuth = () => {
    return(
        useContext(AuthContext)
    )
}

