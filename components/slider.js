import Cycle from '@cycle/core';
import * as Rx from 'rx';
import {div, input, label, h2, makeDOMDriver} from '@cycle/dom';
const O = Rx.Observable;
import mvi from './mvi-mode';


//  * @param bla {{el:string, title:string, selector:string, init:object}}

/**
 * init = {type, min, max, value}
 * eg. {type: 'range', min: 40, max: 150, value: state.value}
 *
 * @returns {Function}
 * @param el {string}
 * @param title {string}
 * @param unit {string}
 * @param init {{type:string, min:int, max:int, value:int}}
 */
export default function slider({el, title, unit, init}) {
    console.log("slider.js : fn 1");
    console.log("init is ... ", init);
    return function (opt) {
        init = opt || init;
        console.log("slider.js : fn 2");

        console.log("init is ... ", init);

        function intent(DOMSource) {
            return DOMSource.select(el).events('input')
                .map(ev => parseInt(ev.target.value));
        }

        function model(value$) {
            return O.combineLatest(
                value$.startWith(init.value || init.min || 0),
                (value) => {
                    return {value};
                }
            );
        }

        /**
         *
         * @param state$ Observable {{value:int}}
         * @returns {*} vtree$
         */
        function view(state$) {
            return state$.map(state =>
                render(value)
            );
        }

        function render({value}) {
            return div([
                div([
                    label(title + value + ' ' + unit),
                    input(el, init)
                ])
            ])
        }

        return mvi({intent, model, view, el, render});
    };

}