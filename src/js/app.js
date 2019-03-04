import '@babel/polyfill';
import './polyfill/polyfill'
import 'intersection-observer';
import Menu from './ui/menu';
import Header from './ui/header';
import Utils from './utils/utils';
import Pjax from './pjax/pjax/pjax';


(() => {

    // Check if mobile
    Utils.isMobile() && document.body.classList.add('is-mobile');

    // Init Header
    let header = new Header(document.querySelector('.header'));

    // Init Menu
    let menu = new Menu(document.querySelector('.header-menu'));

    // Loader
    let loader = document.querySelector('.loader');
    let loaderCount = document.querySelector('.loader__count');
    let loaderGraph = document.querySelector('.loader__graph');

    // Pjax
    new Pjax((percentage) => {
        loaderCount.innerHTML = percentage + '%';
        loaderGraph.style.height = percentage + '%';

        if(percentage == 100) {
            loader.style.backgroundColor = 'transparent';
            loaderGraph.style.top = 0;
            loaderGraph.style.bottom = 'auto';

            let timeline = new TimelineLite();
            timeline.to(loaderCount, 1, {opacity: 0, y: -200, ease: Expo.easeInOut});
            timeline.to(loaderGraph, 1, {height: 0, ease: Expo.easeInOut, onComplete: () => {
                // Remove loader from DOM
                loader.remove();

                // Show header
                header.show();

            }}, "=-0.75");
        }
    });




})();