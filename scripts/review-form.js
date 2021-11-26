const userPasscode = sessionStorage.getItem("validPasscode");
var existingReview = false;
var today = new Date();
var date = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
var userId;

console.log(userPasscode);

const asyncGetReviews = async () => {
    try {
        const response = await fetch('http://localhost:3000/reviews');
        const data = await response.json();
        findReview(data);
    } catch(error) {
        console.log(error)
    } 
}

const findReview = reviewArr => {
    for (let i = 0; i < reviewArr.length; i++) {
        if (reviewArr[i]["passcode"] == userPasscode) {
            console.log(reviewArr[i]);
            existingReview = true;
            allowDelete();
            renderOldReview(reviewArr[i])

            break;
        }
    }
    existingReview ? null : document.querySelector(".delete-container").classList.add("invisible");
}

const renderOldReview = review => {
    console.log(existingReview);
    document.querySelector("#firstName-input").value = review["firstName"];
    document.querySelector("#lastName-input").value = review["lastName"];
    document.querySelector("#textbox-input").value = review["message"];
    userId = review["id"];
}

asyncGetReviews();

document.querySelector(".email-form").addEventListener("submit", event => {
    event.preventDefault();
    const newState = {
        "passcode": userPasscode,
        "firstName": document.querySelector("#firstName-input").value,
        "lastName": document.querySelector("#lastName-input").value,
        "date": date,
        "message": document.querySelector("#textbox-input").value
    }
    asyncAddReview(newState);
})



const asyncAddReview = async (newState) => {
    const fetchStr = existingReview ? `http://localhost:3000/reviews/${userId}` : `http://localhost:3000/reviews`;
    const fetchMethod = existingReview ? 'PATCH' : 'POST';
    try {
        const response = await fetch(fetchStr, {
            method: fetchMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newState)
        });
        const data = await response.json();
            // enter you logic when the fetch is successful
            window.location.href = '/pages/review-confirm.html'
            console.log(data);

    } catch(error) {
        console.log(error)
    } 
}

const allowDelete = () => {
    document.querySelector("#delete-review-but").addEventListener("click", event => {
        event.preventDefault();
        asyncDeleteReview();
    })

}

const asyncDeleteReview = async () => {
    try {
        const response = await fetch(`http://localhost:3000/reviews/${userId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
            // enter you logic when the fetch is successful
            window.location.href = '/pages/review-confirm.html'
            console.log(data);

    } catch(error) {
        console.log(error)
    } 
}