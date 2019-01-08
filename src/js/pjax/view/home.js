import Utils from './../../utils/utils';
import View from './../view/view';
import {TweenMax, TimelineMax} from 'gsap';
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Scroller from './../../utils/scroller';

/**
 *
 * Class View
 * pjax/view/view
 *
 * View is inited when Pjax class find correspondance
 * with a class View and data-view in HTML
 *
 * Don't forget to define new class in _config.js
 *
 * @author vincent
 */

class Home extends View {

    /**
     *
     * Constructor
     *
     */

    constructor() {
        super();
        this.type = 'home';

        this.archives = null;
        this.title = null;
    }

    /**
     *
     * Init
     * Call when DOM is ready
     *
     */

    init(content) {
        super.init(content);

        this.archives = this.content.querySelector('.archives');
        this.items = this.archives.querySelectorAll('.archive');
        this.itemsBg = this.archives.querySelectorAll('.archive__bg');
        this.itemsImg = this.archives.querySelectorAll('.archive__img');
        let lastPosition = this.getLastPosition();

        new Scroller(this.archives, false, lastPosition);

        if(!Utils.isMobile()) {
            for(let archive of this.items) {

                let title = archive.querySelector('.archive__title');
                Utils.textSplitter(title);
                let splittedPart = archive.querySelectorAll('.splitted');

                let timeline = new TimelineMax({paused:true});
                timeline.staggerFrom(splittedPart, 0.5, {opacity: 0, y: 50, ease: Expo.easeInOut}, 0.01);
                archive.animation = timeline;

                archive.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
                archive.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
                archive.addEventListener('click', (e) => this.onMouseClick(e));
            }
        }
    }

    /**
     *
     * Appear
     * Use for animation
     * If previous view exist, this method
     * is fired after previous view dissapearing and transition
     *
     * @returns {Promise}
     *
     */

    appear() {
        super.appear();

        return new Promise((resolve, reject) => {
            TweenMax.set(this.items, {y:'50%'});
            TweenMax.set(this.itemsBg, {y:'100%'});
            TweenMax.set(this.itemsImg, {y:'101%'});

            let timeline = new TimelineMax({delay:0, onComplete: () => {
                resolve()
            }});
            timeline.staggerTo(this.items, 1.25, {y:'0%', ease: Expo.easeInOut}, 0.1);
            timeline.staggerTo(this.itemsBg, 0.75, {y:'0%', ease: Expo.easeInOut}, 0.1, '-=1.5');
            timeline.staggerTo(this.itemsImg, 1.25, {y:'0%', ease: Expo.easeInOut}, 0.1, '-=1.5');
        });
    }

    /**
     *
     * Disappear
     * Use for animation
     * Fired when navigation occurred
     *
     * @returns {Promise}
     *
     */

    disappear() {
        super.disappear();

        return new Promise((resolve, reject) => {
            let timeline = new TimelineMax({delay:0});
            timeline.staggerTo(this.itemsImg, 1.25, {y:'-101%', ease: Expo.easeInOut}, 0.1);
            timeline.staggerTo(this.itemsBg, 0.75, {y:'-100%', ease: Expo.easeInOut}, 0.1, '-=1');
            timeline.staggerTo(this.items, 1.25, {y:'-50%', ease: Expo.easeInOut, onComplete: () => {
                resolve();
            }}, 0.1, '-=1.5');
        });
    }

    /**
     *
     * Destroy
     * Call just before removing view of the DOM
     *
     */
    destroy(){
        super.destroy();
    }

    /**
     * Mouse enter on item
     * @param e Event
     */

    onMouseEnter(e){
        e.target.animation.play();
    }

    /**
     * Mouse leave on item
     * @param e Event
     */

    onMouseLeave(e){
        e.target.animation.reverse();
    }

    /**
     * Mouse click on item
     * @param e Event
     */

    onMouseClick(e){
        localStorage.setItem('lastItemClicked', e.currentTarget.getAttribute('href'));

        e.currentTarget.animation.reverse();
    }

    /**
     * Get the position of last item clicked
     */

    getLastPosition() {
        let pos = 0;

        let href = localStorage.getItem('lastItemClicked');

        if(href != null) {
            let el = this.archives.querySelector('[href="' + href + '"]');
            let elWidth = el.offsetWidth;
            let elPos = el.getBoundingClientRect().left;
            pos = elPos + elWidth / 2 - window.innerWidth / 2;
        }


        return pos;
    }
}

export default Home;