/**
 *
 * Parallax
 * Parallax effect
 *
 * @author vincent
 */

class Parallax {

    /**
     *
     * Constructor
     *
     * @param items DOM Elements to parallax
     * @param speed Optionnal - Default speed
     */

    constructor(items, speed) {
        this.items = [];

        for (let item of items) {
            this.items.push({
                obj: item,
                speed: item.dataset.speed || speed || 2,
                pos: 0,
                smoothPos: 0
            });
        }

        this.render();
    }

    /**
     *
     * Render the parallax
     *
     */

    render() {
        for (let item of this.items) {
            let scrollPosition = window.scrollY;
            item.pos = - scrollPosition * item.speed;
            item.smoothPos += (item.pos - item.smoothPos) / 10;

            let transform = 'translate3d(' + 0 + ','+ item.smoothPos.toFixed(2) + 'px,' + 0 + ')';
            item.obj.style["transform"] = transform;
            item.obj.style["webkitTransform"] = transform;
            item.obj.style["mozTransform"] = transform;
            item.obj.style["msTransform"] = transform;
        }

        window.requestAnimationFrame( this.render.bind(this) );
    }
}

export default Parallax;