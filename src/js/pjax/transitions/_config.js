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

export const transitionClasses = {
    Transition,
    Enlarge,
    Reduce
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
    }
];