const popups = document.querySelectorAll(".popup-houses");
const openButtons = document.querySelectorAll(".item-houses__button");
const closeButtons = document.querySelectorAll(".popup-houses__close")

openButtons.forEach(el => {
    el.addEventListener("click", (e) => {
        e.preventDefault();

        popups.forEach(popup => {
            if (e.target.getAttribute('id') == popup.getAttribute("id")) {
                popup.style.display = "flex";
            }
        })
    });
})

closeButtons.forEach(el => {
    el.addEventListener("click", e => {
        popups.forEach(popup => {
            popup.style.display = "none";
        })
    })
})

document.addEventListener("click", (e) => {
    popups.forEach((el) => {
        if (e.target === el) {
            el.style.display = "none";
        }
    })
})