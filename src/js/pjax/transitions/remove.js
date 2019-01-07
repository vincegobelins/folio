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
            resolve();
            let timeline = new TimelineMax({delay:1, onComplete: () => {
                duplicateObj.remove();
            }});
            timeline.to(duplicateObj, 2, {y: '-200%', opacity: 0, ease: Expo.easeInOut});
        });
    }
}

export default Remove;