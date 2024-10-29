import react from 'react';
import { useAuth } from './Authprovider';
import '../assets/css/Logout.css';

export const Logout = () => {
    const {isAuthenticated} = useAuth();

    const handleClick = async() => {
        const res = await fetch("http://localhost:5500/api/logout", {
            method : 'GET',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include'
        });
        const data = await res.json();
        if(!res.ok){
            console.log('Logout failed');
        }
        console.log(data); 
        window.location.reload();
    }

    return(
        <div className='logout-style' onClick={handleClick}>
            {isAuthenticated ? <p>LOG OUT</p> : null}
        </div>
    )
}