import React from "react";
import { useAuth } from "./Authprovider";
import '../assets/css/Excel.css';
import { useNavigate } from "react-router-dom";

export const Excel = () => {
    const {isAuthenticated, isAdmin} = useAuth();

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/ExcelPage');
    }

    if(isAuthenticated && isAdmin){
    return(
        <button className="excel-btn" onClick={handleNavigate}>USE EXCEL</button>
    )
    }
    else if(isAuthenticated){
        return null;
    }
}