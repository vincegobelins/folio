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
        this.velocity = velocity || 75;

        if(Utils.isMobile()) {
            this.el.style.overflow = 'auto';
        } else {
            this.el.addEventListener('wheel', (e) => this.onMouseWheel(e));
            this.render();
        }
    }

    onMouseWheel(e){
        console.log(e);
        if(e.deltaY > 0) {
            this.increase();
        }
        else {
            this.decrease();
        }
    }

    increase() {
        if(this.position + this.velocity > this.limit) {
            this.position = this.limit;
        }
        else {
            this.position += this.velocity;
        }
    }

    decrease() {
        if(this.position - this.velocity < 0) {
            this.position = 0;
        }
        else {
            this.position -= this.velocity;
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