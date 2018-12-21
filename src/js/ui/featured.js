import {TweenMax, TimelineMax} from 'gsap';

class Featured {

    constructor(el) {
        this.el = el;
        this.image = this.el.querySelector('.featured__image');
        this.isDisplayed = true;
        this.items = this.el.querySelectorAll('.featured--tween');
        this.subtitles = this.el.querySelectorAll('.display__item');
        this.subtitlesIndex = 0;

        this.bindUIActions();
    }

    bindUIActions() {
        window.addEventListener('scroll', () => {

            if(window.scrollY > 50 && this.isDisplayed) {
                this.hide();
            }

            if(window.scrollY < 50 && !this.isDisplayed) {
                this.show();
            }
        });
    }

    show() {
        TweenMax.staggerTo(this.items, 0.75, {opacity:1, y:0, ease:Back.easeOut.config(1.7)}, 0.1);
        this.isDisplayed = true;
    }

    hide() {
        TweenMax.staggerTo(this.items, 0.75, {opacity:0, y:-50, ease:Back.easeOut.config(1.7)}, 0.1);
        this.isDisplayed = false;
    }
}

export default Featured;