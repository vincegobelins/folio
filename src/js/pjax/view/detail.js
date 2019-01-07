import Utils from './../../utils/utils';
import View from './../view/view';
import Parallax from './../../utils/parallax';

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

class Detail extends View {

    /**
     *
     * Constructor
     *
     */

    constructor() {
        super();
        this.type = 'detail';
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
        this.mediaImg = this.content.querySelector('.article__media__img');
        this.mediaIframe = this.content.querySelector('.article iframe');
        this.mediaBg = this.content.querySelector('.article__media__bg');
        this.background = this.content.querySelector('.background');

        let text = this.content.querySelectorAll('.article__detail p, .article__spec, .article__tools');
        new Parallax([this.background]);

        TweenLite.set(text, {opacity: 0, y:50});
        Utils.getIntersections(text, 0, true, el => {
            TweenLite.to(el.target, 1, {opacity:1, y:0, ease: Expo.easeInOut});
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

        this.splitted = this.content.querySelectorAll('.article .article__title .splitted');

        TweenLite.set(this.splitted, {opacity: 0, y: 100});

        return new Promise((resolve, reject) => {
            let timeline = new TimelineLite({onComplete: () => {
                resolve()
            }});
            timeline.staggerTo(this.splitted, 0.75, {opacity: 1, y:0, ease: Expo.easeInOut}, 0.01);
            timeline.from(this.mediaIframe, 1, {y:'100%', ease: Expo.easeInOut}, '-=0.75');
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
            timeline.to(this.mediaIframe, 1.25, {y:'-100%', ease: Expo.easeInOut}, '-=0.75');
            timeline.to(this.background, 1, {'top':'-100%', ease: Expo.easeInOut, onComplete: () => {
                TweenLite.set(this.mediaWrap, {opacity:0, immediateRender:false});
                resolve()
            }}, '-=1.25');
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

export default Detail;