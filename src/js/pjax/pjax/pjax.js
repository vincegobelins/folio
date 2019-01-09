import {viewClasses} from './../view/_config';
import {transitionClasses, transitions} from './../transitions/_config';
import * as constant from './../../utils/constant';
import Utils from './../../utils/utils';


/**
 *
 * Class Pjax
 * pjax/pjax/pjax
 *
 * @author vincent
 */

class Pjax {

    /**
     *
     * Constructor
     *
     * @param itemsHTML Array HTML Elements to parallax
     */

    constructor() {
        this.currentView = null;
        this.newView = null;

        this.initialURL = document.URL;
        this.isLocked = false;

        this.init();
        this.bindUIActions(document);
        this.bindClientAction();
    }

    /**
     * Init the view
     */
    init(){
        this.currentContent = document.querySelector('main');
        let currentViewType = this.capitalizeFirstLetter(this.currentContent.dataset.view);

        if(!this.isClass(viewClasses[currentViewType])) {
            newViewType = 'View';
        }

        this.currentView = new viewClasses[currentViewType];
        this.currentView.init(this.currentContent);
        this.currentView.appear();
    }

    /**
     *
     * Events
     * - Click on links
     * - Navigation
     *
     */

    bindUIActions(selector) {
        let links = selector.querySelectorAll('a');
        for(let link of links) {
            link.addEventListener('click', (e) => this.handleClick(e));
        }

    }

    bindClientAction() {
        window.addEventListener('popstate', (e) => this.onPopState(e));
    }

    /**
     *
     * Handle click on links
     * @param e Event
     *
     */

    handleClick(e){

        let obj = e.currentTarget.id || false;
        let url = e.currentTarget.href;

        // Don't pjax anchor #
        if(!url.includes('#') && url != location.href) {

            e.preventDefault();

            // Pjaxify
            this.pjaxify(url, obj);

            // Push state
            this.setHistory(url, obj);
        }
    }

    onPopState(e){
        // Prevent scroll
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        if (this.isLocked == true) {
            window.location.replace(e.state.link);
        }
        else if(e.state) {
            this.pjaxify(e.state.link, e.state.obj);
        }
        else {
            this.pjaxify(this.initialURL);
        }
    }

    /**
     *
     * Do AJAX Request and manage it
     *
     */

    doRequest(url, method) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    /**
     * Controller for PJAX
     *
     * @param url URL of target page
     * @param obj Last object clicked, used for transition
     * @param transition Optional transition
     *
     */

    pjaxify(url, obj) {

        this.lock().then(() => {
            return this.doRequest(url, 'GET');
        })
        .then((content) => {

            let promises = [];

            // Append new content
            this.newContent = this.parseXMLHttpRequest(content);
            this.currentContent.after(this.newContent);

            // Init new View
            let newViewType = this.capitalizeFirstLetter(this.newContent.dataset.view);

            if(!this.isClass(viewClasses[newViewType])) {
                newViewType = 'View';
            }

            this.newView = new viewClasses[newViewType];
            this.newView.init(this.newContent);

            // Set info
            this.newView.setPrevType(this.currentView.getType());
            this.currentView.setNextType(this.newView.getType());

            // Init Transition

            let transition = this.getTransition(this.currentView.getType(), this.newView.getType());
            if(transition) {
                let transitionClass = new transition();
                promises.push(transitionClass.play(this.currentContent, this.newContent, obj));
            }

            promises.push(this.currentView.disappear());

            // Disappearance of current view + transition
             return Promise.all(promises)

        }, (error) => {
            constant.DEBUG && console.log('[PJAX] Request Error');
        })
            .then(() => {
                constant.DEBUG && console.log('[PJAX] Disappearance of current view done.');

                // Remove current content
                this.currentContent.remove();

                // Appearance of new view
                return this.newView.appear();
            })
            .then(() => {
                constant.DEBUG && console.log('[PJAX] Appearance of new view done');

                // Destroying current view
                this.currentView.destroy();

                // Updating
                this.currentView = this.newView;
                this.newView = null;

                this.currentContent = this.newContent;

                this.bindUIActions(this.currentContent);

                // Unlock screen
                this.unlock();
            });
    }

    parseXMLHttpRequest(content) {
        let res = document.createElement('div');
        res.innerHTML = content;
        return res.querySelector('main');
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    isClass(testClass){
        return typeof testClass === 'function';
    }

    setHistory(url, obj) {
        let stateObj = { link: url, obj: obj };
        history.pushState(stateObj, '', url);
    }

    /**
     * Prevent actions from user
     * @returns {Promise}
     */

    lock() {
        this.isLocked = true;

        document.body.style.overflow = 'hidden';
        document.body.style.pointerEvents = 'none';

        return new Promise(function (resolve, reject) {
            Utils.smoothScroll(0, 500, false, () => {
                resolve();
            });
        });
    }

    /**
     * Permit actions from user
     */

    unlock() {
        this.isLocked = false;

        document.body.style.overflow = 'auto';
        document.body.style.pointerEvents = 'auto';
    }

    /**
     *
     * Get transition Class if exist
     *
     * @param currentViewType String
     * @param nextViewType String
     * @returns {*} Class or null
     */

    getTransition(currentViewType, nextViewType) {
        for(let transition of transitions) {
            if(transition.from == currentViewType) {
                if(transition.to == nextViewType) {
                    return transition.transition;
                }
            }
        }
    }
}

export default Pjax;