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

        this.main = this.content.querySelector('.article__content');
        this.mediaWrap = this.content.querySelector('.article__wrapper__media');
        this.media = this.content.querySelector('.article__media');
        this.mediaIframe = this.content.querySelector('.article iframe');
        this.mediaImg = this.content.querySelector('.article__media__img');
        this.background = this.content.querySelector('.background');

        let text = this.content.querySelectorAll('.article__detail > *, .article__spec, .button');
        TweenLite.set(text, {opacity: 0, y:50});
        Utils.getIntersections(text, 0, true, el => {
            TweenLite.to(el.target, 1, {opacity:1, y:0, ease: Expo.easeInOut});
        });

        TweenLite.set(this.background, {'top':'100%'});
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

        this.splitted = this.content.querySelectorAll('.article .article__title .splitted');

        return new Promise((resolve, reject) => {

            let timeline = new TimelineLite({onComplete: () => {
                resolve();
                new Parallax([this.background]);
            }});

            timeline.to(this.background, 3, {'top':'-45%', ease: Expo.easeOut});
            timeline.staggerFrom(this.splitted, 0.75, {opacity: 0, y: 100, ease: Expo.easeInOut}, 0.01, '-=3');
            timeline.from(this.media, 2, {y:'30%', opacity: 0, ease: Expo.easeInOut}, '-=3.25');
            this.mediaImg && timeline.from(this.mediaImg, 1.5, {opacity: '0', ease: Expo.easeInOut}, '-=3');
            this.mediaIframe && timeline.from(this.mediaIframe, 1.5, {opacity: '0', ease: Expo.easeInOut}, '-=2');
            timeline.from(this.main, 1, {y:100, opacity:0, ease: Expo.easeInOut}, '-=0.75');
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
            let timeline = new TimelineLite({delay:0});
            timeline.staggerTo(this.splitted, 0.75, {opacity: 0, y:-100, ease: Expo.easeInOut}, 0.01);
            timeline.to(this.background, 2, {'top':'-100%', ease: Expo.easeInOut}, '-=1.25');
            timeline.to(this.media, 1.5, {y:'-50%', opacity: 0, ease: Expo.easeIn, onComplete: () => {
                resolve()
            }}, '-=1.5');
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