

function calculatePrice(accommodation, eventType, tourType, adultCount, childCount, adultPrice, childPrice, photographyPrice, videographyPrice, weddingPrice, conferencePrice, spiceGardenPrice, beeGardenPrice, fullTourPrice, period, periodTime){

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
    else if(accommodation === 'Education'){
        if(period > 0){
            if(tourType === 'spiceEnclave'){
                total = spiceGardenPrice*adultCount*period;
            }
            else if(tourType === 'beeGarden'){
                total = beeGardenPrice*adultCount*period;
            }
            else if(tourType === 'fullTour'){
                total = fullTourPrice*adultCount*period;
            }
        }
        else if(period === 0){
            if(tourType === 'spiceEnclave'){
                total = spiceGardenPrice*adultCount;
            }
            else if(tourType === 'beeGarden'){
                total = beeGardenPrice*adultCount;
            }
            else if(tourType === 'fullTour'){
                total = fullTourPrice*adultCount;
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