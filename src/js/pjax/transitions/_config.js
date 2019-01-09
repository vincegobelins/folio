/**
 *
 * Transition Configuration
 *
 * For each new Transition, please import
 * and add in transitionsClasses constant
 */

import Transition from './../transitions/transition';
import Enlarge from './../transitions/enlarge';
import Reduce from './../transitions/reduce';
import Remove from './../transitions/remove';

export const transitionClasses = {
    Transition,
    Enlarge,
    Reduce,
    Remove
};

export const transitions = [
    {
        from: 'home',
        to: 'detail',
        transition: transitionClasses.Enlarge
    },
    {
        from: 'detail',
        to: 'home',
        transition: transitionClasses.Reduce
    },
    /*{
        from: 'detail',
        to: 'page',
        transition: transitionClasses.Remove
    }*/
];