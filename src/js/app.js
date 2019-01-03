import '@babel/polyfill';
import './polyfill/polyfill'
import $ from 'jquery';
import 'slick-carousel';
import 'intersection-observer';
//import {TweenMax, TimelineMax} from 'gsap';
import Menu from './ui/menu';
import Header from './ui/header';
import Featured from './ui/featured';
import Utils from './utils/utils';
import Parallax from './utils/parallax';
import Pjax from './pjax/pjax/pjax';


(() => {
    // Init Header
    let header = new Header(document.querySelector('.header'));

    // Init Menu
    let menu = new Menu(document.querySelector('.header-menu'));

    /**
     * Intersections
     */
    let sections = document.querySelectorAll('.section');
    /*TweenMax.set(sections, {opacity: 0, y:'50px'});
    Utils.getIntersections(sections, -300, true, el => {
        TweenMax.to(el.target, 1, {opacity:1, y:0, ease: Expo.easeInOut});
    });*/

    /*let archives = document.querySelectorAll('.archive');
    TweenMax.set(archives, {opacity: 0, y:'50px'});
    Utils.getIntersections(archives, -100, false, el => {
        TweenMax.to(el.target, 1, {opacity:1, y:0, ease: Expo.easeInOut});
    });*/

    Utils.getIntersections(sections, -100, false, el => {
        menu.setActive(el.target.id);
    });

    // Anchor
    let buttons = document.querySelectorAll('.button');
    for(let button of buttons) {
        button.addEventListener('click', (e) => goTo(e));
    }

    // Parallax
    new Parallax(document.querySelectorAll('.section__image'), 0.5);

    // Featured
    //let featured = new Featured(document.querySelector('.featured'));

    // Init Slider
    initSlider();

    // Clean card

    let cardsTitles = document.querySelectorAll('.cards__title');
    let maxHeightCardsTitles = 0;
    for(let el of cardsTitles) {
        if(el.offsetHeight > maxHeightCardsTitles){
            maxHeightCardsTitles = el.offsetHeight;
        }
    }
    for(let el of cardsTitles) {
        el.style.minHeight = maxHeightCardsTitles + 'px';
    }

    // Pjax
    let pjaxManager = new Pjax();

})();

function initSlider() {
    $('.cards__list').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.cards__prev'),
        nextArrow: $('.cards__next'),
        rows: 0,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}

function goTo(e) {
    let link = e.target.getAttribute('href');

    if(link && link.indexOf('#') == 0) {
        e.preventDefault();

        let el = document.querySelector(link);

        if(el) {
            let parent = el.offsetParent;
            let position = el.offsetTop + parent.offsetTop;
            let height = document.querySelector('.header').offsetHeight - 40;
            Utils.smoothScroll(position - height);
        }
    }

}