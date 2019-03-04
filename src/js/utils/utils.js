let Utils = {

    /**
     * Smooth scroll to position
     * @param position int position
     * @param duration int duration in ms
     * @param $el
     * @param cb
     */
    smoothScroll : (position, duration = 1000, element = document.scrollingElement || document.documentElement, cb) => {
        //t = current time
        //b = start value
        //c = change in value
        //d = duration
        Math.easeInOutQuad = function (t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };

        let start = element.scrollTop,
            change = position - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function(){
            currentTime += increment;
            element.scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else {
                cb && cb();
            }
        };
        animateScroll();
    },


    /**
     * Return callback if displayed on screen
     * @param el Array of elements to track
     * @param offset margin
     * @param once Fire just once
     * @param delay Delay if multiple element
     * @param cb Callback
     */
    getIntersections: (el, offset, once, delay = 100, cb) => {

        // observer options
        let observerOptions = {
            root: null,
            rootMargin: '0px 0px ' + offset + 'px 0px',
            threshold: 0
        };

        // observer
        let delayCounter = 0;
        let observer = new IntersectionObserver((entries) => {
            entries.forEach( (entry, i) => {

                if(entry.isIntersecting) {
                    setTimeout(() => cb && cb(entry, entry.isIntersecting), delayCounter * delay);
                    delayCounter++;

                    once && observer.unobserve(entry.target);
                } else {
                    cb && cb(entry, entry.isIntersecting);
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
    },

    /**
     * Check if is mobile or tablet
     * @returns {boolean}
     */

    isMobile(){
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    },

    getLoader(cb) {
        var width = 100,
            perfData = window.performance.timing,
            EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
            time = parseInt((EstimatedTime/1000)%60)*100;

        var start = 0,
            end = 100;

        animateValue(start, end, time);

        function animateValue(start, end, duration) {

            var range = end - start,
                current = start,
                increment = end > start? 1 : -1,
                stepTime = Math.abs(Math.floor(duration / range));

            var timer = setInterval(function() {
                current += increment;
                cb && cb(current);
                //obj.innerHTML = current;
                if (current == end) {
                    clearInterval(timer);
                }
            }, stepTime);
        }
    }

};

export default Utils;