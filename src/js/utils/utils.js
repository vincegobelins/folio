import $ from 'jquery';

let Utils = {

    /**
     * Smooth scroll to position
     * @param int position
     * @param int duration in ms
     */
    smoothScroll : function(position,duration,$el, cb){
        duration = duration || 1000;
        $el = $el || $('body,html');
        $el.animate({ scrollTop: position },
            { duration: duration, easing: 'swing', queue: false, complete: function() {
                cb && cb();
            }}
        );
    },

    /**
     * Return callback if displayed on screen
     * @param el Array of elements to track
     * @param offset margin
     * @param once Fire just once
     * @param cb Callback
     */
    getIntersections: function(el, offset, once, cb) {
        // observer options
        let observerOptions = {
            root: null,
            rootMargin: '0px 0px ' + offset + 'px 0px',
            threshold: 0
        };

        // observer
        let observer = new IntersectionObserver((entries) => {
            entries.forEach( (entry, i) => {

                if(entry.isIntersecting) {
                    setTimeout(() => cb && cb(entry), i * 250);

                    once && observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // observe all items
        for (let item of el) {
            observer.observe(item);
        }
    },

    /**
     * Split text into word for animation
     * @param string
     * @returns {boolean}
     */

    textSplitter(string) {

        const SPACE = ' ';
        const WORD_STYLE = 'style="display: inline-flex;"';
        const CHARACTER_STYLE = 'style="display: block;"';
        const WORD_CLASS = 'word';
        const CHARACTER_CLASS = 'splitted';

        if(string) {
            let newString = '';
            let splittedString = string.innerHTML.split("");
            let i = 0;

            for(let split of splittedString) {

                let style = '', suffix = '', preffix = '';

                /* If space */
                if(split == SPACE){
                    style = '';
                    preffix = '</span>';
                    suffix = '<span class="' + WORD_CLASS + '" ' + WORD_STYLE + '>';
                }
                else {
                    style = CHARACTER_STYLE;

                    if(i == 0) {
                        preffix = '<span class="' + WORD_CLASS + '" ' + WORD_STYLE + '>';
                    }

                    if(i == splittedString.length) {
                        suffix = '</span>';
                    }
                }

                newString += preffix + '<span ' + style + ' class="' + CHARACTER_CLASS + '">' + split + '</span>' + suffix;

                i++;
            }

            string.innerHTML = newString;
        }
        return string;
    }

};

export default Utils;