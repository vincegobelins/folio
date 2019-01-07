import * as constant from './../../utils/constant';
import Transition from './../transitions/transition';
import {TweenMax, TimelineMax} from 'gsap';

/**
 *
 * Class Transition
 * pjax/transition/transition
 *
 *
 * @author vincent
 */

class Reduce extends Transition {

    /**
     *
     * Constructor
     *
     */

    constructor() {
        super();
        this.type = 'enlarge';
    }

    /**
     *
     * Play
     * For example : duplicate some old content and tween at the same position of new
     *
     */

    play(oldContent, newContent, obj) {
        super.play();
        return new Promise((resolve, reject) => {

            let media = oldContent.querySelector('.article__wrapper__media');

            // get initial position
            let pos = media.getBoundingClientRect();
            let duplicateObj = media.cloneNode(true);
            duplicateObj.querySelector('iframe').remove();

            // copy to the end of the body
            document.body.append(duplicateObj);

            // copy position
            TweenMax.set(duplicateObj, {'left': pos.left, 'top': pos.top, 'position':'fixed', opacity: 1, zIndex: -1 });


            // find old position with the new content
            let href = localStorage.getItem('lastItemClicked');
            let nextObj = newContent.querySelector('[href="' + href + '"]');
            let nextPos = nextObj.getBoundingClientRect();
            let scale = nextObj.offsetWidth / duplicateObj.offsetWidth;

            let xPos = nextPos.left + nextObj.offsetWidth / 2 - duplicateObj.offsetWidth / 2;
            let yPos = nextPos.top + nextObj.offsetHeight / 2 - duplicateObj.offsetHeight / 2;

            // make transition
            resolve();

            let timeline = new TimelineMax({delay:1, onComplete: () => {
                TweenLite.set(nextObj, {opacity: 1, immediateRender:false });
                duplicateObj.remove();
            }});
            timeline.set(nextObj, {opacity: 0, immediateRender:false });
            timeline.set(duplicateObj, {zIndex: 0, immediateRender:false });
            timeline.to(duplicateObj, 1, {'left': xPos, 'top': yPos, ease: Expo.easeInOut});
            timeline.to(duplicateObj, 1, {scale: scale, ease: Expo.easeInOut});
        });
    }
}

export default Reduce;