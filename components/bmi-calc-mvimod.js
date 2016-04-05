import Cycle from '@cycle/core';
import * as Rx from 'rx';
import {div, input, label, h2, makeDOMDriver} from '@cycle/dom';
const O = Rx.Observable;
import mvi from './mvi-mode';
import slider from './slider';


/*


 * init = {type, min, max, value}
 * eg. {type: 'range', min: 40, max: 150, value: state.value}
 *
 * @returns {Function}
 * @param el {string}
 * @param title {string}
 * @param init {{type:string, min:int, max:int, value:int}}


 */

export function init() {
    const weight$ = slider({
        el: ".weight",
        title: "Weight",
        unit: "kg",
        init: {type: 'range', min: 40, max: 150, value: 73}
    })();
    const height$ = slider({
        el: ".height",
        title: "Height",
        unit: "km",
        init: null
    })({type: 'range', min: 140, max: 220, value: 140});

    return {
        weight$,
        height$
    }
}


export default function bmiCalc(opt) {
    console.log("bmi-calc.js");
    let {weight$, height$} = init(opt);

    return function () {
        function intent(DOMSource) {
            const changeWeight$ = weight$.intent(DOMSource);
            const changeHeight$ = height$.intent(DOMSource);
            return {changeWeight$, changeHeight$};
        }

        function model({changeWeight$, changeHeight$}) {
            return O.combineLatest(
                weight$.model(changeWeight$),
                height$.model(changeHeight$),
                (weight, height) => {
                    const heightMeters = height.value * 0.01;
                    const bmi = Math.round(weight.value / (heightMeters * heightMeters));
                    return {bmi, weight, height};
                }
            );
        }

        function view(state$) {
            return state$.map(({bmi, weight, height}) => {
                    return div([
                        weight$.render(weight),
                        height$.render(height),
                        h2('bmi-calc: BMI is ' + bmi)
                    ]);
                }
            );
        }


        const module = mvi({intent, model, view, el: opt.el});

        console.log("bmi-calc: module is ... ", module);

        //module.run();
        return module;
    };


}