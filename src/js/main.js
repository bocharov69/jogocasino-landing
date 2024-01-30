import Swiper from "swiper";
import {Navigation} from "swiper/modules";

window._ax.isWebp();

const browser = new window._ax.Browser();
fetch("@files/locales/lang.json")
    .then((response) => {
        return response.json();
    })
    .then((lang) => {
        const translateContent = new window._ax.Locale({
            defaultLanguage: "pt",
            locales: lang,
            elementsToTranslateDataAttribute: "data-translate",
            keywordsToReplace: [
                ["{browserName}", browser.browserName],
                ["{browser}", browser.browserName],
            ],
            afterTranslateCallBack: () => {
                window._ax.textFitHandler();
            },
        });
    });

//burger menu
const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");
burger.addEventListener("click", function (e) {
    e.preventDefault();
    burger.classList.toggle("active");
    nav.classList.toggle("active");
});

//mp slider
const mp_slider = new Swiper("#main-page .section.--four .swiper", {
    modules: [Navigation],
    direction: "horizontal",
    slidesPerView: "1.3",
    speed: 500,
    spaceBetween: 15,
    autoHeight: false,
    observer: true,
    observeParents: true,
    navigation: {
        nextEl: "#main-page .section.--four .swiper-button-next",
        prevEl: "#main-page .section.--four .swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: "2",
            spaceBetween: 20,
        },
        1400: {
            slidesPerView: "3",
            spaceBetween: 30,
        }
    },
});
