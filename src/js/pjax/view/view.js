import * as constant from './../../utils/constant';

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
 * //TODO Faire une copier et créer home. Ne laisser que les console log dans cette classe.
 *
 * @author vincent
 */

class View {

    /**
     *
     * Constructor
     *
     */

    constructor() {
        this.type = 'view';
        this.content = null;
    }

    /**
     *
     * Init
     * Call when DOM is ready
     * @param content DOM
     *
     */

    init(content) {

        constant.DEBUG && console.log('[VIEW] Init view of type ' + this.type);

        this.content = content;
        this.content.style.position = 'absolute';
        this.content.style.top = 0;
        this.content.style.left = 0;
        this.content.style.width = '100%';
        this.content.style.zIndex = '-1';
        this.content.style.opacity = 0;
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

        constant.DEBUG && console.log('[VIEW] Appear view of type ' + this.type);

        this.content.style.position = 'relative';
        this.content.style.top = 'auto';
        this.content.style.left = 'auto';
        this.content.style.width = 'auto';
        this.content.style.zIndex = 'auto';
        this.content.style.opacity = 1;
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
        constant.DEBUG && console.log('[VIEW] disappear view of type ' + this.type);
    }

    /**
     *
     * Destroy
     * Call just before removing view of the DOM
     *
     */
    destroy(){
        constant.DEBUG && console.log('[VIEW] destroy view of type ' + this.type);
    }
}

export default View;