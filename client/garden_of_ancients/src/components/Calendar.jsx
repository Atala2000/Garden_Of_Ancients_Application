import React, {useState, useEffect} from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../assets/css/Calendar.css';
import { subDays } from "date-fns";

export const DateCalendar = ({onChange}) => {

    const [coveredDates, setCoveredDates] = useState([]);

    useEffect(() => {
        const fetchDates = async() => {
            const res = await fetch('http://localhost:5500/api/getDates', {
                method : 'GET',
                credentials : 'include'
            });
            const dates = await res.json();
            if(dates.length === 0){
                console.log("No Dates Found!");
            }
            setCoveredDates(dates);
        };
        fetchDates();
        
    }, []);

    const isCoveredDates = (date) => {
        return coveredDates.some(covered => {
            const startDate = new Date(covered.startDate);
            const newstartDate = subDays(startDate, 1);
            const endDate = new Date(covered.endDate);
            return date >= newstartDate && date <= endDate;
        });
    }

    const tileDisabled = ({date, view}) => {
        if(view === 'month' && coveredDates.length > 0){
            return isCoveredDates(date);
        }
        return false;
    }

    return(
        <div className="date-calendar">
            <Calendar tileDisabled={tileDisabled} onChange={onChange}/>
        </div>
    )
}