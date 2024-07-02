

function calculatePrice(accommodation, adultCount, childCount, adultPrice, childPrice, conferencePrice, period){
    
    let total;
    if(accommodation === "Room"){
        const totalAdultPrice = adultCount*adultPrice*period;
        const totalChildPrice = childCount*childPrice*period;
        total = totalAdultPrice + totalChildPrice;
    }
    else{
        total = conferencePrice*period;
    }
    return total;
}

export {calculatePrice};