import Utils from './../utils/utils';

class Header {

    constructor(el) {
        this.el = el;
        this.menuButton = el.querySelector('.menu-button');
        this.prevPos = 0;
        this.isDisplayed = true;

        this.bindUIActions();

        if(!Utils.isMobile()){
            window.addEventListener('scroll', (e) => this.handleScroll(e));

            TweenLite.set('.logo, .header-menu__link', {y:-100, opacity: 0});
            this.show();
        }
    }

    bindUIActions() {
        this.menuButton.addEventListener('click', (e) => this.onMenuButtonClick(e));
    }

    onMenuButtonClick() {

        let action = document.body.classList.contains('menu-is-open') ? 'close' : 'open';

        let event = new CustomEvent('menu', {
            detail: {
                action: action,
            }
        });

        document.dispatchEvent(event);

    }

    handleScroll() {
        let pos = window.scrollY;
        let direction = true;
        if( this.prevPos > pos ) {
            direction = false;
        }

        // Show menu if scroll top
        if(!this.isDisplayed && !direction) {
            this.show();
        }

        // Hide menu if scroll down
        else if ( pos > 20 && this.isDisplayed && direction ) {
            this.hide();
        }

        this.prevPos = pos;
    }
    
    show(){
        TweenMax.staggerTo('.logo, .header-menu__link', 0.75, {opacity:1, y:0, ease: Expo.easeInOut}, 0.05);
        this.isDisplayed = true;
    }
    
    hide(){
        TweenMax.staggerTo('.logo, .header-menu__link', 0.75, {opacity:0, y:-100, ease: Expo.easeInOut}, 0.05);
        this.isDisplayed = false;
    }
}

export default Header;