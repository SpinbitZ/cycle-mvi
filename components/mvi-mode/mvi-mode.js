import { run } from '@cycle/core';
import * as Rx from 'rx';
import {makeDOMDriver} from '@cycle/dom';
//const O = Rx.Observable;

/**
 *
 * @param el
 * @param intent
 * @param model
 * @param view
 * @param main
 * @param drivers
 * @param render - [optional] {Function}
 * @param makeDriver - [optional] {Function}
 * @param cycleKey - [optional] {Function}
 * @returns {{el: *, intent: *, model: *, view: *, render: *, main: main, computer: main, drivers: drivers, human: drivers, run: run}}
 */
export const mvi = ({el, intent, model, view, vtree, main, drivers, render, makeDriver, cycleKey}) => {
    !makeDriver ? (makeDriver = makeDOMDriver) : "";
    !cycleKey ? (cycleKey = el) : "";
    const
        VTREE = !vtree ? view(model(intent)) : vtree,
        linkCycle = getlinkCycleFn(cycleKey),
        /**
         *
         * @returns {{DOM: *}}
         */
        DRIVERS = () => {
            return linkCycle(
                makeDriver(el)
            );
        },
        /**
         *
         * @param sources
         * @returns {{DOM: *}}
         */
        MAIN = (sources) => {
            return linkCycle(VTREE(sources[cycleKey]));
        },
        /**
         *
         */
        RUN = () => {
            const d = !drivers ? DRIVERS() : drivers;
            const m = !main ? MAIN : main;
            return run(m, d)
        },
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
        addSource = ()=>{},
        addSink = ()=>{};

    return {
        el,
        //3D
        intent,
        model,
        view,
        render: render || view,
        vtree: VTREE,
        //2D
        /// MAIN
        main: MAIN,
        computer: MAIN,
        /// HUMAN
        drivers: DRIVERS,
        human: DRIVERS,
        ///// SOURCE /-->  SINK
        source,
        sink,
        addSource,
        addSink,
        //-> RUN ///////
        run: RUN
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

