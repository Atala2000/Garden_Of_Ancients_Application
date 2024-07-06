

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



function calculateTotalPrice(cart){
    let totalPrice = 0;
    cart.forEach((item, index) => {
        totalPrice += cart[index].price
    });
    return totalPrice;
}

export {calculatePrice, calculateTotalPrice};