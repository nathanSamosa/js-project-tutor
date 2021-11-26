var newEmail = {
    "firstName": "",
    "lastName": "",
    "emailAddress": "",
}

document.querySelector(".email-form").addEventListener("submit", event => {
    event.preventDefault();
    newEmail = {
        "firstName": document.querySelector("#firstName-input").value,
        "lastName": document.querySelector("#lastName-input").value,
        "emailAddress": document.querySelector("#email-input").value,
    }

    console.log(newEmail)

    asyncGetCall();
})

const asyncGetCall = async () => {
    try {
        const response = await fetch('http://localhost:3000/waiting-list', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmail)
        });
        const data = await response.json();
    
            // enter you logic when the fetch is successful
            window.location.href = '/pages/waiting-list-confirm.html'
            console.log(data);

    } catch(error) {

        // enter your logic for when there is an error (ex. error toast)
        console.log(error)

    } 
}