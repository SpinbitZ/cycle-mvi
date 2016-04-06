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
 * @param makeDriver - [optional] {Function}
 * @param cycleKey - [optional] {Function}
 * @returns {{el: *, intent: *, model: *, view: *, render: *, main: main, computer: main, drivers: drivers, human: drivers, run: run}}
 */
export const mvi = ({el, intent, model, view, render, makeDriver, cycleKey}) => {
    !makeDriver ? (makeDriver = makeDOMDriver) : "";
    !cycleKey ? (cycleKey = el) : "";
    const
        linkCycle = getlinkCycleFn(cycleKey),
        /**
         *
         * @param source
         * @param evt
         * @returns {*}
         */
        source = (source, evt) => {
            const src = source.select(el);
            if (evt) {
                return src.events(evt)
            }
            return src;
        },
        /**
         *
         * @param fn
         * @param opts
         * @returns {*}
         */
        sink = ({fn, opts}) => {
            return fn(el, opts)
        },
        /**
         *
         * @returns {{DOM: *}}
         */
        drivers = () => {
            return linkCycle(
                makeDriver(el)
            );
        },
        /**
         *
         * @param sources
         * @returns {{DOM: *}}
         */
        main = (sources) => {
            return linkCycle(
                view(model(intent(sources[cycleKey])))
            );
        },
        /**
         *
         */
        run = () => {
            return Cycle.run(main, drivers())
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
        ///// SOURCE /--> SINK
        source,
        sink,
        //-> RUN ///////
        run
    }
};



export const getlinkCycleFn = (cycleKey) => {
    return (fn, key) => {
        const d = {};
        !key ? (key = cycleKey) : "";
        d[key] = fn;
        console.log("linkCycle: ", d);
        return d;
    }
};

