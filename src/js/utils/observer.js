/**
 *
 * SimpleObserver
 * Use Intersection Observer
 *
 * @author vincent
 */

class SimpleObserver {

    /**
     *
     * Constructor
     *
     */

    constructor() {
        this.observer = null;
    }

    /**
     * Return callback if displayed on screen
     * @param el Array of elements to track
     * @param offset margin
     * @param once Fire just once
     * @param delay Delay if multiple element
     * @param cb Callback
     */
    observe(el, offset, once, delay = 250, cb) {


        // observer options
        let observerOptions = {
            root: null,
            rootMargin: '0px 0px ' + offset + 'px 0px',
            threshold: 0
        };

        // observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach( (entry, i) => {


                setTimeout(() => cb && cb(entry, entry.isIntersecting), i * delay);

                if(entry.isIntersecting && once) {
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // observe all items
        for (let item of el) {
            this.observer.observe(item);
        }
    }

    unobserve(){
        this.observer.disconnect();
    }


}

export default SimpleObserver;