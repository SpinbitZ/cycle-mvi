import Cycle from '@cycle/core';
import {div, input, label, makeDOMDriver} from '@cycle/dom';
import * as Rx from 'rx';
const O = Rx.Observable; //!!

/**
 *
 *
 *
 * @param opt {{el: string}}
 * @returns {Function}
 */

export default function mviMod(opt) {

    return function(){

        /////// Outside-in...IMV - processing side-effects --->  channeled through "/// DRIVERS".

        //// ->/////// INTENT-ACTION - Takes the DOM driver SOURCE interface to the outside intent and returns "input" mapped as value
        function intent(DOMSource) {
            return DOMSource.select('.prop')
                .events('input')
                .map(ev => ev.target.value);
        }

        ///// MODEL-STATE - (no side effects)
        function model(intent$) {
            return O.combineLatest(
                intent$.startWith(70),
                (value) => {
                    console.log("value is ... ", value);
                    return {value}; // {value:37}
                }
            );
        }

        ///// VIEW-TREE - render state - (still no side-effects) ---> //// vTree$
        function view(state$) {
            return state$.map(state =>

                div({id:opt.el},[
                    div([
                        label('mvi-mod:: Property: ' + state.value + 'amounts'),
                        input('.prop', {type: 'range', min: 40, max: 150, value: state.value})
                    ])
                ])

            );
        }



        /////// IO-CYCLE- -> i/o - source/sink -->  mvi cycle, and DOM-link - for interfacing with side-effects or /// DRIVERS
        function MAIN(SOURCES) {
            return {
                DOM: view(model(intent(SOURCES.DOM)))
            };
        }

         /////// /////// SIDE-EFFECTS  --- in and out ... through drivers
        const DRIVERS = {
            //// SINKS --->
            DOM: makeDOMDriver(opt.el) // eg. "#main"
        };

        //// one-function api
        Cycle.run(MAIN, DRIVERS);

    };

}


