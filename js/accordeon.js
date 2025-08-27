const accordions = document.querySelectorAll('.item-about');
const accordionsContent = document.querySelectorAll('.item-about__content');
const accordionsIcons = document.querySelectorAll('.item-about__icon');

let currentElement

accordions.forEach(item => item.addEventListener('click', (e) => {
    currentElement = item;
    
    if (item.classList.contains("active")) {
        item.classList.remove("active")
    } else {
        accordions.forEach(el => {
            el.classList.remove("active")
        })
        item.classList.add("active")
    }

    // if (activeContent.classList.contains('active')) {
    //     activeContent.classList.remove('active');
    //     item.classList.remove('active');
    //     activeContent.style.maxHeight = 0;
    // } else {
    //     accordionsContent.forEach(element => {
    //         element.classList.remove('active');
    //         element.style.maxHeight = 0;
    //     })

    //     accordions.forEach(element => element.classList.remove('active'));

    //     item.classList.add('active');
    //     activeContent.classList.add('active');
    //     activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
    // }
}))