import Cycle from '@cycle/core';
import * as Rx from 'rx';
import {makeDOMDriver} from '@cycle/dom';
//const O = Rx.Observable;

/**
 *
 * @param el
 * @param intent
 * @param model
 * @param view
 * @param render - [optional] {Function}
 * @returns {{el: *, intent: *, model: *, view: *, render: *, main: main, computer: main, drivers: drivers, human: drivers, run: run}}
 */
export default ({el, intent, model, view, render}) => {
    const
        drivers = ()=>{
            return{
                DOM: makeDOMDriver(el)
            }
        },
        main = (sources) => {
            return {
                DOM: view(model(intent(sources.DOM)))
            };
        },
        run = () => {
            Cycle.run(main, drivers())
        };

    return {
        el,
        //3D
        intent,
        model,
        view,
        render: render || view,
        //2D
        /// MAIN
        main,
        computer: main,
        /// HUMAN
        drivers,
        human: drivers,
        //-> RUN ///////
        run
    }
}

