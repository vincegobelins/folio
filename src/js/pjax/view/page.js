import Utils from './../../utils/utils';
import View from './../view/view';
import Parallax from './../../utils/parallax';

/**
 *
 * Class Page
 * pjax/view/view
 *
 * View is inited when Pjax class find correspondance
 * with a class View and data-view in HTML
 *
 * Don't forget to define new class in _config.js
 *
 * @author vincent
 */

class Page extends View {

    /**
     *
     * Constructor
     *
     */

    constructor() {
        super();
        this.type = 'page';
    }

    /**
     *
     * Init
     * Call when DOM is ready
     *
     */

    init(content) {
        super.init(content);

        let background = this.content.querySelector('.background');
        let article = this.content.querySelector('.article');
        let text = this.content.querySelectorAll('.article__detail > *, .article__spec, .button');
        new Parallax([background]);

        TweenMax.set(text, {opacity: 0, y:50});
        Utils.getIntersections(text, 0, true, el => {
            TweenMax.to(el.target, 1, {opacity:1, y:0, ease: Expo.easeInOut});
        });
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

        let title = this.content.querySelector('.article__title');
        Utils.textSplitter(title);

        TweenLite.set('.splitted', {opacity: 0, y: 100});

        return new Promise(function (resolve, reject) {

            TweenLite.set('.article .article__media', {y:'10%'});
            TweenLite.set('.article .article__media__bg', {y:'100%'});
            TweenLite.set('.article .article__media__img', {y:'101%'});

            let timeline = new TimelineLite({onComplete: () => {
                resolve()
            }});
            timeline.staggerTo('.splitted', 0.75, {opacity: 1, y:0, ease: Expo.easeInOut}, 0.01);
            timeline.from('.article__media iframe', 1, {y:'100%', ease: Expo.easeInOut}, '-=0.75');
            timeline.from('.article__content', 1, {y:100, opacity:0, ease: Expo.easeInOut}, '-=0.75');
            timeline.to('.article .article__media', 1.25, {y:'0%', ease: Expo.easeInOut}, '-=1');
            timeline.to('.article .article__media__bg', 0.75, {y:'0%', ease: Expo.easeInOut}, '-=1.5');
            timeline.to('.article .article__media__img', 1.25, {y:'0%', ease: Expo.easeInOut}, '-=1.5');
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
        return new Promise(function (resolve, reject) {
            let timeline = new TimelineLite({delay:0});
            timeline.to('.background', 1, {'top':'-100%', ease: Expo.easeInOut});
            timeline.staggerTo('.splitted', 0.75, {opacity: 0, y:-100, ease: Expo.easeInOut}, 0.01, '-=0.5');
            timeline.to('.article__media iframe', 1, {y:'-100%', ease: Expo.easeInOut}, '-=2');
            timeline.to('.article .article__media__img', 1.25, {y:'-101%', ease: Expo.easeInOut}, '-=1.5');
            timeline.to('.article .article__media__bg', 0.75, {y:'-100%', ease: Expo.easeInOut}, '-=1');
            timeline.to('.article .article__media', 1.25, {y:'-10%', ease: Expo.easeInOut, onComplete: () => {
                resolve()
            }}, '-=1.5');

            //timeline.to('.article__content', 1, {y:-100, opacity:0, ease: Expo.easeInOut}, '-=1');
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
}

export default Page;