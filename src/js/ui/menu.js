import Utils from './../utils/utils';
import {TweenMax, TimelineMax} from 'gsap';

class Menu {

    constructor(el) {
        this.el = el;
        this.items = this.el.querySelectorAll('a[href*="#"]');
        this.height = document.querySelector('.header').offsetHeight - 40;
        this.isFull = false;

        this.bindUIActions();
    }

    bindUIActions() {
        for(let item of this.items) {
            item.addEventListener('click', (e) => this.onClick(e));
        }

        document.addEventListener('menu', (e) => {
            e.detail.action == 'open' && this.open();
            e.detail.action == 'close' && this.close();
        }, false);
    }

    onClick(e) {
        e.preventDefault();
        this.goTo(e.target.getAttribute('href'));
        this.isFull && this.close();
    }

    goTo(id) {

        let el = document.querySelector(id);

        if(el) {
            let parent = el.offsetParent;
            let position = el.offsetTop + parent.offsetTop;
            Utils.smoothScroll(position - this.height);
        }
    }

    setActive(id) {
        if(id) {
            let link = document.querySelector('a[href="#' + id + '"]');

            if(link) {
                    this.removeActive();
                link.classList.add('active');
            }
        }
    }

    removeActive() {
        for(let item of this.items) {
            item.classList.remove('active');
        }
    }

    open() {
        let timeline = new TimelineMax();
        timeline.set(this.items, {opacity:0, x: 50});
        timeline.to(this.el, 0.5, {x: '-100%', ease:Expo.easeInOut});
        timeline.staggerTo(this.items, 0.75, {opacity:1, x:0, ease:Back.easeOut.config(1.7)}, 0.1, '-=0.2');

        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-is-open');

        this.isFull = true;
    }

    close() {
        let timeline = new TimelineMax();
        timeline.to(this.el, 0.5, {x: '100%', ease:Expo.easeInOut});

        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-is-open');

        this.isFull = false;
    }

}

export default Menu;