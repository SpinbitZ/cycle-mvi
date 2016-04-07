import { run } from '@cycle/core';
import { makeDOMDriver, h } from '@cycle/dom';
import { Observable } from 'rx';
import StaticComponent from './static';

console.log("app static");

function main(SOURCES) {
    const staticComponent = StaticComponent(SOURCES);
    const vtree$ = staticComponent.DOM.map(staticVTree => div(staticVTree));
    return { //-> SINKS
        DOM: vtree$
    };
}

const drivers = {
    DOM: makeDOMDriver('#example-app')
};

run(
    main, //-> COMPUTER
    drivers //-> HUMAN
);