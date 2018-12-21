import $ from 'jquery';

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
     * @param itemsHTML Array HTML Elements to parallax
     */

    constructor(itemsHTML, speed) {
        this.items = [];

        for (let i = 0; i < itemsHTML.length; i++) {
            let item = {
                id : i,
                obj: itemsHTML[i],
                speed: itemsHTML[i].dataset.speed || speed,
                height: itemsHTML[i].offsetHeight,
                step: 0,
                pos: 0,
                smoothPos: 0
            }

            this.items.push(item);
        }

        this.render();
    }

    /**
     *
     * Render the parallax
     *
     */

    render() {
        let i = 0;

        Array.prototype.forEach.call(this.items, function(item) {
            i++;
            let scrollPosition = $(window).scrollTop();
            let elPosition = $(item.obj).offset().top ;

            // Calc pos and smooth pos
            item.pos = (elPosition - scrollPosition - 400) * item.speed/10;
            item.smoothPos += (item.pos - item.smoothPos) / 10;

            // Apply style
            let transform = 'translate3d(' + 0 + ','+ item.smoothPos.toFixed(2) + 'px,' + 0 + ')';
            item.obj.style["transform"] = transform;
            item.obj.style["webkitTransform"] = transform;
            item.obj.style["mozTransform"] = transform;
            item.obj.style["msTransform"] = transform;
        });

        window.requestAnimationFrame( this.render.bind(this) );
    }
}

export default Parallax;