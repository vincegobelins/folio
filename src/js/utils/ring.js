/**
 *
 * Ring
 * Loader ring
 *
 * @author vincent
 */

class Ring {

    /**
     *
     * Constructor
     *
     */

    constructor() {
        this.ring = document.querySelector('.loader-ring');
        this.pointerX = 0;
        this.pointerY = 0;
        this.posX = 0;
        this.posY = 0;
        this.offset = 20;
        this.height = this.ring.offsetHeight;
        this.width = this.ring.offsetWidth;


        document.onmousemove = (e) => this.onMouseMouve(e);

        this.hide();
        this.render();
    }

    onMouseMouve(e){
        if(e.clientX + this.offset + this.width < window.innerWidth) {
            this.pointerX = e.clientX + this.offset;
        }
        else {
            this.pointerX = window.innerWidth - this.offset - this.width;
        }

        if(e.clientY + this.offset + this.height < window.innerHeight) {
            this.pointerY = e.clientY + this.offset;
        }
        else {
            this.pointerY = window.innerHeight - this.offset - this.width;
        }
    }

    /**
     *
     * Follow the pointer
     *
     */

    render() {
        this.posX += (this.pointerX - this.posX) / 10;
        this.posY += (this.pointerY - this.posY) / 10;

        this.ring.style.top = this.posY + 'px';
        this.ring.style.left = this.posX + 'px';

        window.requestAnimationFrame( this.render.bind(this) );
    }

    show() {
        this.ring.style.opacity = 1;
    }

    hide() {
        this.ring.style.opacity = 0;
    }
}

export default Ring;