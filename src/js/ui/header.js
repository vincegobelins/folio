class Header {

    constructor(el) {
        this.el = el;
        this.menuButton = el.querySelector('.menu-button');

        this.bindUIActions();
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
}

export default Header;