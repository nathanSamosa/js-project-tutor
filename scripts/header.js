const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const anchorLinks = document.querySelectorAll(".anchor-link");

navToggle.addEventListener("click", function () {
    links.classList.toggle("show-links");
});

anchorLinks.forEach(link => {
    link.addEventListener("click", function () {
        links.classList.toggle("show-links");
    }); 
})

