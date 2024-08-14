

function calculatePrice(accommodation, eventType, tourType, adultCount, childCount, adultPrice, childPrice, photographyPrice, videographyPrice, weddingPrice, conferencePrice, spiceGardenPrice, beeGardenPrice, fullTourPrice, period, periodTime){

    let total;
    if(accommodation === "Room"){
        const totalAdultPrice = adultCount*adultPrice*period;
        const totalChildPrice = childCount*childPrice*period;
        total = totalAdultPrice + totalChildPrice;
    }
    else if(accommodation === 'Conference'){
        period += 1;
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
    else if(accommodation === 'Education'){
        period += 1;
        if(tourType === 'spiceEnclave'){
            if(adultCount < 5){
                adultCount = 5;
            }
            total = spiceGardenPrice*adultCount*period;
        }
        else if(tourType === 'beeGarden'){
            if(adultCount < 5){
                adultCount = 5;
            }
            total = beeGardenPrice*adultCount*period;
        }
        else if(tourType === 'fullTour'){
            if(adultCount < 5){
                adultCount = 5;
            }
            total = fullTourPrice*adultCount*period;
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