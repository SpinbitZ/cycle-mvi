//import scroller from './components/scroller-mvi.js';
//scroller({el:'topnav-hero'})();
//console.log("scroller is ... ", scroller);

import Cycle from '@cycle/core';
import bmi from './components/bmi-calc-mvimod';

const topNavBMI = bmi({el:'#topnav-hero'})();

//Cycle.run(topNavBMI.main, topNavBMI.drivers());
topNavBMI.run();