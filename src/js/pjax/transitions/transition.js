import * as constant from './../../utils/constant';

/**
 *
 * Class Transition
 * pjax/transition/transition
 *
 *
 * @author vincent
 */

class Transition {

    /**
     *
     * Constructor
     *
     */

    constructor() {
        this.type = 'transition';
    }

    /**
     *
     * Play
     * For example : duplicate some old content and tween at the same position of new
     *
     */

    play(oldContent, newContent, event) {
        constant.DEBUG && console.log('[TRANSITION] Playing transition of type ' + this.type);
    }
}

export default Transition;