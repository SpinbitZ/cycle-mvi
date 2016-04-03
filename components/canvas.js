import Cycle from '@cycle/core';
//import {div, input, label,p, makeDOMDriver} from '@cycle/dom';
import * as Rx from 'rx';
//import RDOM from 'rx-dom';
//Rx.DOM = RDOM.DOM;


const O = Rx.Observable; //!!


/**

 * @param opt {{el: string}}
 * @returns {Function}
 */

export default function canvas(opt) {

    console.log("opt is ... ", opt);

    return function (opt2) {


        console.log("opt2 is ... ", opt2);


        function intent(SOURCE$) {


            console.log("intent: SOURCE$ is ... ", SOURCE$);


            return SOURCE$;
        }

        function model(DRAW$) {


            return DRAW$;
        }


        function view(drawState$) {


            return drawState$
        }



        function MAIN(SOURCES) {
            return {
                DOM: view(model(intent(SOURCES)))
            };
        }


        const DRIVERS = {
            DOM: makeDOMDriver("#" + opt.el) // eg. "#main"
        };

        Cycle.run(MAIN, DRIVERS);

        return MAIN;
    };

}
