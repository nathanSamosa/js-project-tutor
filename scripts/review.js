reviewsArr = [];
i = 0;
const firstNameEl = document.querySelector("#review-firstName");
const lastNameEl = document.querySelector("#review-lastName");
const dateEl = document.querySelector("#review-date");
const messageEl = document.querySelector("#review-textbox");

const reduceIndex = document.querySelector(".arrow-left");
const increaseIndex = document.querySelector(".arrow-right");

const asyncGetCall = async () => {
    try {
        const response = await fetch('http://localhost:3000/reviews');
        const data = await response.json();
        reviewsArr = data;
    
            // enter you logic when the fetch is successful
            init();

    } catch(error) {

        // enter your logic for when there is an error (ex. error toast)
        console.log(error)

    } 
}

function init() {
    eventListeners();
    renderReview();
}

asyncGetCall();

function renderReview() {
    firstNameEl.innerText = reviewsArr[i]["firstName"];
    lastNameEl.innerText = reviewsArr[i]["lastName"];
    dateEl.innerText = reviewsArr[i]["date"];
    messageEl.innerText = reviewsArr[i]["message"];

    renderArrows()
}

function renderArrows() {
    !i ? reduceIndex.classList.add("restrict") : reduceIndex.classList.remove("restrict");
    i == reviewsArr.length - 1 ? increaseIndex.classList.add("restrict") : increaseIndex.classList.remove("restrict");
}

function eventListeners() {
    reduceIndex.addEventListener("click", () => {
        if(!reduceIndex.classList.contains("restrict")) {
            i -= 1;
            renderReview();
        }
    })
    increaseIndex.addEventListener("click", () => {
        if (!increaseIndex.classList.contains("restrict")) {
            i += 1;
            renderReview();
        }
    })
}

