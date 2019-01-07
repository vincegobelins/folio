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

    // Pjax
    let pjaxManager = new Pjax();


})();