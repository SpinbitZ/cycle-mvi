//import scroller from './components/scroller-mvi.js';
//scroller({el:'topnav-hero'})();
//console.log("scroller is ... ", scroller);





//import Cycle from '@cycle/core';
//import calc from './components/mvi-mode/calc-mvi';
//import {bmi, m2, m3, m4} from './components/mvi-mode/calc-config';
//import {getlinkCycleFn} from './components/mvi-mode/mvi-mode';



import dynamic from './components/mvi-mode/dynamic-mvi-app';

dynamic({el:"#topnav-hero"}).run();



//calc(bmi).run();
//calc(m2).run();
//calc(m3).run();
//calc(m4).run();

//const linkDOM = getlinkCycleFn("DOM");

//
//
//function main(){
//
//}
//
//function drivers(){
//    //return {
//    //    mvi.li
//    //}
//
//}
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