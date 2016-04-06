import Cycle from '@cycle/core';
import * as Rx from 'rx';
import {div, input, h2, makeDOMDriver} from '@cycle/dom';
const O = Rx.Observable;
import {mvi} from './mvi-mode';
import slider from './slider';


function init({el, title, sliders}) {
    console.log("el is ... ", el);
    console.log("sliders is ... ", sliders);
    const weight$ = slider(sliders.sliderOne)();
    const height$ = slider(sliders.sliderTwo)();

    return {
        weight$,
        height$
    }
}

/**
 * slider => init = {type, min, max, value}
 * eg. {type: 'range', min: 40, max: 150, value: state.value}
 *
 * @returns {Function}
 * @param el {string}
 * @param title {string}
 * @param sliders {string}
 *
 * @returns {{el, intent, model, view, render, main, computer, drivers, human, source, sink, run}|{el: *, intent: *, model: *, view: *, render: *, main: main, computer: main, drivers: drivers, human: drivers, run: run}}
 */
export default function calc({el, title, sliders}) {
    console.log("title is ... ", title);
    let {weight$, height$} = init({el, title, sliders});

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
        return state$.map(render);
    }

    function render({bmi, weight, height}) {
        return div([
            weight$.render(weight),
            height$.render(height),
            h2(title + bmi)
        ]);
    }

    return mvi({intent, model, view, render, el});


}