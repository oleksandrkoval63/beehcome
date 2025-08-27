const menu = document.querySelector(".header-mobile__nav");
const menuButton = document.querySelector(".header-mobile__menu");

menuButton.addEventListener("click", (e) => {
    menuButton.classList.toggle("active")
    menu.classList.toggle("active")
});

if (menu.classList.contains("active")) {
    document.addEventListener("click", (e) => {
        if (e.target !== menu) {
            menuButton.classList.remove("active")
            menu.classList.remove("active")
        }
    })
}

const contacts = document.querySelector(".contacts");
const circle = document.querySelector(".community__circle")

circle.addEventListener("click", (e) => {
    contacts.scrollIntoView({behavior: "smooth", inline: "start" })
});