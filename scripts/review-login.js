var passcode = "";

document.querySelector(".email-form").addEventListener("submit", event => {
    event.preventDefault();
    passcode = document.querySelector("#passcode-input").value;
    asyncGetPasscodes();
})

const asyncGetPasscodes = async () => {
    try {
        const response = await fetch('http://localhost:3000/passcodes');
        const data = await response.json();
        verifyPasscode(data);
    } catch(error) {
        console.log(error)
    } 
}

function verifyPasscode(data) {
    data.includes(passcode) ? allowLogin() : alert("Sorry, this passcode is not recognised.")
}

function allowLogin() {
    sessionStorage.setItem("validPasscode", passcode);
    window.location.href = '/pages/review-form.html'
}

