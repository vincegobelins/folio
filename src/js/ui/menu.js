import Utils from './../utils/utils';
import {TweenMax, TimelineMax} from 'gsap';

class Menu {

    constructor(el) {
        this.el = el;
        this.items = this.el.querySelectorAll('a');
        this.height = document.querySelector('.header').offsetHeight - 40;
        this.isFull = false;

        this.update(window.location.href);
        this.bindUIActions();
    }

    bindUIActions() {
        document.addEventListener('menu', (e) => {
            e.detail.action == 'open' && this.open();
            e.detail.action == 'close' && this.close();
        }, false);

        window.addEventListener('pagechange', (e) => this.onPageChange(e));

        window.addEventListener('resize', (e) => this.onResize(e));
    }

    onPageChange(e) {
        e.preventDefault();
        this.isFull && this.close();

        this.update(e.detail);
    }

    onResize(e) {
        if(window.innerWidth > 860) {
            TweenLite.set(this.el, {y: '0%'});
        }
    }

    update(url) {
        for(let item of this.items) {
            if(item.href == url) {
                item.classList.add('active');
            }
            else {
                item.classList.remove('active');
            }
        }
    }

    open() {
        let timeline = new TimelineMax();
        timeline.set(this.items, {opacity:0, y: 50});
        timeline.set(this.el, {y: '100%'});
        timeline.to(this.el, 0.5, {y: '-100%', ease:Expo.easeInOut});
        timeline.staggerTo(this.items, 0.75, {opacity:1, y:0, ease:Back.easeOut.config(1.7)}, 0.1, '-=0.2');

        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-is-open');

        this.isFull = true;
    }

    close() {
        let timeline = new TimelineMax();
        timeline.to(this.el, 0.5, {y: '-200%', ease:Expo.easeInOut});

        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-is-open');

        this.isFull = false;
    }

}

export default Menu;