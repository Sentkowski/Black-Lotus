window.onscroll = function(ev) {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        document.querySelector(".footer-flower-right").style.animationPlayState = 'running';
        document.querySelector(".footer-flower-left").style.animationPlayState = 'running';
    }
};

const tourButton = document.querySelector(".tour-show-more-button");
tourButton.addEventListener("click", toggleTour);

const singleButton = document.querySelectorAll(".single-button");
singleButton.forEach((button) => {
    button.addEventListener("click", toggleSingleSelection)
})

function toggleTour() {
    const tourButton = document.querySelector(".tour-show-more-button");
    const tourDates = document.querySelectorAll(".see-more-tour");
    if (tourDates[0].style.display === 'none' || !tourDates[0].style.display) {
        tourDates.forEach(tour => {
            tour.style.display = 'block';
        });
        tourButton.textContent = 'Collapse'
    } else {
        tourDates.forEach(tour => {
            tour.style.display = 'none'
        })
        tourButton.textContent = 'See more'
    }
}

function toggleSingleSelection(evt) {
    const selectionContainer = evt.target.nextElementSibling;
    selectionContainer.style.display = 'block';
    document.addEventListener("click", (outerEvt) => {
        if (outerEvt.target !== evt.target && outerEvt.target !== selectionContainer) {
            selectionContainer.style.display = 'none';
        }
    })
}