import Cycle from '@cycle/core';
import * as Rx from 'rx';
import {div, input, h2, makeDOMDriver} from '@cycle/dom';
const O = Rx.Observable;
import {mvi} from './mvi-mode';
import slider from './slider-mvi';


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

    /////// TODO : generalize to config iteratable
    let {weight$, height$} = init({el, title, sliders});

    function intent(source) {
        const changeWeight$ = weight$.intent(source);
        const changeHeight$ = height$.intent(source);
        return {changeWeight$, changeHeight$};
    }

    function model({changeWeight$, changeHeight$}) {
        return O.combineLatest(
            weight$.model(changeWeight$),
            height$.model(changeHeight$),
            (weight, height) => {
                const heightMeters = height.value * 0.01;
                const calc = Math.round(weight.value / (heightMeters * heightMeters));
                return {calc, weight, height};
            }
        );
    }

    function view(state$) {
        return state$.map(render);
    }

    function render({calc, weight, height}) {
        return div([
            weight$.render(weight),
            height$.render(height),
            h2(title + calc)
        ]);
    }

    return mvi({intent, model, view, render, el});

}

function init({el, title, sliders}) {
    const weight$ = slider(sliders.sliderOne)();
    const height$ = slider(sliders.sliderTwo)();

    return {
        weight$,
        height$
    }
}