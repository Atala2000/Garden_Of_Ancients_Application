

function calculatePrice(accommodation, eventType, adultCount, childCount, adultPrice, childPrice, photographyPrice, videographyPrice, weddingPrice, conferencePrice, period, periodTime){
    
    let total;
    if(accommodation === "Room"){
        const totalAdultPrice = adultCount*adultPrice*period;
        const totalChildPrice = childCount*childPrice*period;
        total = totalAdultPrice + totalChildPrice;
    }
    else if(accommodation === 'Conference'){
        if(period>0){
            if(eventType === 'Meeting'){
        total = conferencePrice*period*periodTime;
            }
            else if(eventType === 'Photography'){
                total = photographyPrice*period*periodTime;
            }
            else if(eventType === 'Videography'){
                total = photographyPrice*period*periodTime;
            }
            else if(eventType === 'Wedding'){
                total = photographyPrice*period*periodTime;
            }
        }
        else if(period === 0){
            if(eventType === 'Meeting'){
            total = conferencePrice*periodTime;
            }
            else if(eventType === 'Photography'){
                total = photographyPrice*periodTime;
            }
            else if(eventType === 'Videography'){
                total = videographyPrice*periodTime;
            }
            else if(eventType === 'Wedding'){
                total = weddingPrice*periodTime*adultCount;
            }
        }
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