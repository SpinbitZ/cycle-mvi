import Cycle from '@cycle/core';
import * as Rx from 'rx';
import {div, input, label, h2, makeDOMDriver} from '@cycle/dom';
const O = Rx.Observable;


export default function bmiCycle(opt) {
    console.log("bmi-cycle.js");
    return function(){
        function intent(DOMSource) {
            const changeWeight$ = DOMSource.select('.weight').events('input')
                .map(ev => ev.target.value);
            const changeHeight$ = DOMSource.select('.height').events('input')
                .map(ev => ev.target.value);
            return {changeWeight$, changeHeight$};
        }
        function model(changeWeight$, changeHeight$) {
            return O.combineLatest(
                changeWeight$.startWith(70),
                changeHeight$.startWith(170),
                (weight, height) => {
                    const heightMeters = height * 0.01;
                    const bmi = Math.round(weight / (heightMeters * heightMeters));
                    return {bmi, weight, height};
                }
            );
        }
        function view(state$) {
            return state$.map(state =>
                div([
                    div([
                        label('Weight: ' + state.weight + 'kg'),
                        input('.weight', {type: 'range', min: 40, max: 150, value: state.weight})
                    ]),
                    div([
                        label('Height: ' + state.height + 'cm'),
                        input('.height', {type: 'range', min: 140, max: 220, value: state.height})
                    ]),
                    h2('BMI is ' + state.bmi)
                ])
            );
        }
        function main(sources) {
            const {changeWeight$, changeHeight$} = intent(sources.DOM);
            const state$ = model(changeWeight$, changeHeight$);
            const vtree$ = view(state$);

            //view(model(intent(sources.DOM)))

            return {
                DOM: vtree$
            };
        }

        const drivers = {
            DOM: makeDOMDriver(opt.el)
        };
        Cycle.run(main, drivers);

    };



}