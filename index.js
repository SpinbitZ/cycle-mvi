//import scroller from './components/scroller-mvi.js';
//scroller({el:'topnav-hero'})();
//console.log("scroller is ... ", scroller);

import Cycle from '@cycle/core';
import calc from './components/calc-mvi';
import {m1, m2, m3, m4} from './components/calc-config';
import {getlinkCycleFn} from './components/mvi-mode';

calc(m1).run();
calc(m2).run();
calc(m3).run();
calc(m4).run();

const linkCycle = getlinkCycleFn("DOM");



function main(){

}

function drivers(){
    //return {
    //    mvi.li
    //}

}
//Cycle.run(m1.main, m1.drivers());
//Cycle.run(m1.computer, m1.human());
//m1.run();


/*


 function main(sources) {
 return {
 DOM: view(model(selectIntent(sources.DOM)))
 };
 }

 const drivers = {
 DOM: makeDOMDriver(opt.el)
 };

 Cycle.run(main, drivers);

 */