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

class Remove extends Transition {

    /**
     *
     * Constructor
     *
     */

    constructor() {
        super();
        this.type = 'remove';
    }

    /**
     *
     * Play
     * For example : duplicate some old content and tween at the same position of new
     *
     */

    play(oldContent, newContent, obj) {
        super.play();
        return new Promise(function (resolve, reject) {

            let media = oldContent.querySelector('.article__wrapper__media');

            // get initial position
            let pos = media.getBoundingClientRect();
            let duplicateObj = media.cloneNode(true);
            duplicateObj.querySelector('iframe').remove();

            // copy to the end of the body
            document.body.append(duplicateObj);

            // copy position
            TweenMax.set(duplicateObj, {'left': pos.left, 'top': pos.top, 'position':'fixed', opacity: 1, zIndex: -1 });

            // make transition


            let timeline = new TimelineMax({delay:1, onComplete: () => {
                duplicateObj.remove();
                resolve();
            }});
            timeline.to(duplicateObj, 1, {y: '-30%', opacity: 0, ease: Expo.easeInOut});
        });
    }
}

export default Remove;