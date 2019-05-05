window.onscroll = function(ev) {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        document.querySelector(".footer-flower-right").style.animationPlayState = 'running';
        document.querySelector(".footer-flower-left").style.animationPlayState = 'running';
    }
};