  

const carousel = document.querySelector(".rec-courses-holder");
const arrowBtns = document.querySelectorAll(".rec-courses i");
const firstCardwidth = carousel.querySelector(".course").offsetWidth;
const isMobile = window.matchMedia("(max-width: 800px)").matches;
let isDragging = false, startX, startScrollLeft;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardwidth : firstCardwidth;
    })
})
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

window.addEventListener("load", () => {
    autoSlide();
 })
 
 function autoSlide() {
    setInterval(() => {
        slide(getItemActiveIndex() + 1);
    }, 3000);
}

function slide(toIndex) {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");

    if (toIndex >= itemsArray.length) {
        toIndex = 0;
    }

    const newItemActive = itemsArray[toIndex];

    // start transition
    newItemActive.classList.add("carousel_item__pos_next");
    setTimeout(() => {
        newItemActive.classList.add("carousel_item__next");
        itemActive.classList.add("carousel_item__next");
    }, 20);

    // remove all transition class and switch active class
    newItemActive.addEventListener("transitionend", () => {
        itemActive.className = "carousel_item";
        newItemActive.className = "carousel_item carousel_item__active";
    }, {
        once: true
    });
}

function getItemActiveIndex() {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    return itemActiveIndex;
}

// Start the autoSlide function
autoSlide();

