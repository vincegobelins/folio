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

class Enlarge extends Transition {

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

    play(oldContent, newContent, objId) {
        super.play();
        return new Promise(function (resolve, reject) {

            // get initial position
            let obj = document.getElementById(objId);
            let pos = obj.getBoundingClientRect();
            let duplicateObj = obj.cloneNode(true);
            obj.style.opacity = 0;

            // copy to the end of the body
            document.body.append(duplicateObj);
            let splittedPart = duplicateObj.querySelectorAll('.splitted');

            // copy position
            TweenMax.set(duplicateObj, {'left': pos.left - 20, 'top': pos.top - 20, 'position':'fixed', opacity: 1 });

            // find new position with the new content
            let nextObj = newContent.querySelector('.article__media');
            let nextPos = nextObj.getBoundingClientRect();
            let scale = nextObj.offsetWidth / duplicateObj.offsetWidth;

            let xPos = nextPos.left + nextObj.offsetWidth / 2 - duplicateObj.offsetWidth / 2 - 20;
            let yPos = nextPos.top + nextObj.offsetHeight / 2 - duplicateObj.offsetHeight / 2 - 20;

            // make transition
            let timeline = new TimelineMax({delay:0.5});
            //timeline.staggerTo(splittedPart, 0.75, {opacity: 0, y: -100, ease: Expo.easeInOut}, 0.01);
            timeline.to(duplicateObj, 1.25, {scale: scale, 'left': xPos, 'top': yPos, ease: Expo.easeInOut, onComplete: () => {
                resolve();
                duplicateObj.remove();}});
        });
    }
}

export default Enlarge;