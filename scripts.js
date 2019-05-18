let flowersPlayed = 0;
let lastScrollPos = 0;

window.addEventListener("load", function() {
    insertTourDates();
    const tourButton = document.querySelector(".tour-show-more-button");
    tourButton.addEventListener("click", toggleTour);
    const singleButtons = document.querySelectorAll(".single-button");
    singleButtons.forEach((button) => {
        button.addEventListener("click", toggleSingleSelection)
    })
    const newsModalButtons = document.querySelectorAll(".news-read-more-button");
    newsModalButtons.forEach((button) => {
        button.addEventListener("click", showModal)
    })
    const modalCloseButtons = document.querySelectorAll(".news-modal-close-button");
    modalCloseButtons.forEach((button) => {
        button.addEventListener("click", closeModal)
    })
    const aboutMoreButton = document.querySelector(".about-read-more-button");
    aboutMoreButton.addEventListener("click", toggleAbout);
    createObservers();
}, false);

function toggleTour() {
    const tourButton = document.querySelector(".tour-show-more-button");
    const tourDates = document.querySelectorAll(".see-more-tour");
    if (tourDates[0].style.display === 'none' || !tourDates[0].style.display) {
        tourDates.forEach(tour => {
            tour.style.display = 'block';
        });
        tourButton.textContent = 'See less';
    } else {
        tourDates.forEach(tour => {
            tour.style.display = 'none';
        })
        tourButton.textContent = 'See more';
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

function showModal(evt) {
    const modal = evt.target.nextElementSibling;
    modal.style.display = 'block';
    lastScrollPos = document.body.scrollTop;
    document.querySelector("main").style.height = 0;
    document.querySelector("main").style.overflow = 'hidden';
}

function closeModal() {
    document.querySelector("main").style.height = 'auto';
    document.querySelector("main").style.overflow = 'auto';
    document.querySelectorAll(".news-modal").forEach((modal) => modal.style.display = 'none');
    document.body.scrollTop = lastScrollPos;
}

function toggleAbout() {
    const aboutButton = document.querySelector(".about-read-more-button");
    const paragraphs = document.querySelectorAll(".about-text.see-more-text");
    if (paragraphs[0].style.display === 'none' || !paragraphs[0].style.display) {
        paragraphs.forEach(par => {
            par.style.display = 'block';
        });
        aboutButton.textContent = 'Hide';
    } else {
        paragraphs.forEach(par => {
            par.style.display = 'none';
        })
        aboutButton.textContent = 'Keep reading';
    }
}

function createObservers() {
    const leafRight =  document.querySelector(".footer-flower-right");
    const leafLeft =  document.querySelector(".footer-flower-left");
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.25]
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(leafRight);
    observer.observe(leafLeft);
}

function handleIntersect(entries) {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.25 && flowersPlayed !== 2 && entry.target.style.animationPlayState !== 'running') {
            entry.target.style.animationPlayState = 'running';
            setTimeout(function() {
                entry.target.style.animationPlayState = 'paused';
            }, 500);
            flowersPlayed += 1;
        }
        else if (entry.intersectionRatio == 0) {
            flowersPlayed = 0;
        }
    });
}

function romanize(num) {
    const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '';
    for (let i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
}

function createTourDates() {
    const base = new Date();
    let tourDates = [];
    for (let i = -2; i < 7; i++) {
        let newDate = new Date();
        newDate.setDate(base.getDate() + i *2);
        tourDates.push(newDate);
    }
    return tourDates;
}

function insertTourDates() {
    const tourDatesElements = Array.from(document.querySelectorAll(".tour-date"));
    const generatedDates = createTourDates();
    for (let i = 0; i < tourDatesElements.length; i++) {
        const day = generatedDates[i].getDate();
        const month = romanize(generatedDates[i].getMonth() + 1);
        tourDatesElements[i].innerHTML = `${day}.${month}`;
    }
}