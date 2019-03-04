import Utils from './../utils/utils';

/**
 *
 * Scroller
 * Horizontal smooth scroll
 *
 * @author vincent
 */

class Scroller {

    /**
     *
     * Constructor
     *
     * @param itemsHTML Array HTML Elements to parallax
     */

    constructor(el, velocity, offset) {

        this.el = el;
        this.limit = this.el.scrollWidth - window.innerWidth;
        this.position = offset || 0;
        this.translation = - offset || 0;
        this.velocity = velocity || 0.5;

        // Disable on mobile device
        if(Utils.isMobile()) {
            this.el.style.overflow = 'auto';
            this.el.scrollLeft = this.position;
        } else {
            this.el.addEventListener('wheel', (e) => this.onMouseWheel(e));
            this.render();
        }
    }

    /**
     * Handle mouse wheel event
     * @param e Event
     */

    onMouseWheel(e){
        e.preventDefault();
        let offset = e.deltaMode ? 100 * e.deltaY : e.deltaY;

        if(e.deltaY > 0) {
            this.increase(offset);
        }
        else {
            this.decrease(offset);
        }
    }

    /**
     * Increase the position of the scroll
     */

    increase(delta) {
        if(this.position + this.velocity > this.limit) {
            this.position = this.limit;
        }
        else {
            this.position += this.velocity * delta;
        }
    }

    /**
     * Decrease the position of the scroll
     */

    decrease(delta) {
        if(this.position - this.velocity < 0) {
            this.position = 0;
        }
        else {
            this.position += this.velocity * delta;
        }
    }

    /**
     *
     * Render scroll
     *
     */

    render() {
        this.translation += (- this.position - this.translation) / 10;

        let transform = 'translate3d(' + this.translation + 'px,' + 0 + ', ' + 0 + ')';
        this.el.style["transform"] = transform;
        this.el.style["webkitTransform"] = transform;
        this.el.style["mozTransform"] = transform;
        this.el.style["msTransform"] = transform;

        window.requestAnimationFrame( this.render.bind(this) );
    }
}

export default Scroller;