import Cycle from '@cycle/core';
import {div, input, label,p, makeDOMDriver} from '@cycle/dom';
import * as Rx from 'rx';
const O = Rx.Observable; //!!

/**
 ////// Cycle-MVI-as-UI-Recursion

 Cycle.js is a "pure" form of a functional and reactive unidirectional data-flow.

 Cycle is not a circle, but a spiral.



 # -model-centric-cycle-flow

 # -As functional flow it looks more like IVM, but a focus on the central role of the model gives us MVI.

 Linearly the functional flow is outside in, cycling with implicit USER function.
 # -USER: From the DOM source (user: read or input from),
 ## INTENT: transforming into focused intent,
 ## MODEL: then modelled as data input for the view (sink)
 ## VIEW: DOM driver for feeding back into the USER input or sink function and to return again into the DOM source, U.
 # -USER: DOM sink (user: write or render to)

  USER function via DOM drivers is the implicit output for the DOMSource input here.

*/

 function main(DOMSource) {
  // ---> output at the end is DOM sink or vTree$ which returns here as --> input from user function (drivers)
    return DOMSource.select(opt.el)
        //# -intent -->
        .events('scroll')
        .map(e => e.target.scrollTop)
        //# -model -->  - set whatever data the view requires
        .startWith(0)
        //# -view -->  -consume and react to the data by rendering the DOM
        .map(state => {
            //# -VIRTUAL-DOM --->  -sink or vTree$
            return div({id: opt.el}, [
                div([
                    label('mvi-mod:: Property: ' + state + 'amounts'),
                    input('.prop', {type: 'range', min: 40, max: 150, value: state})
                ])
            ])
        });
}
/**
 As functional composition, however, you can see more clearly how the cycle is inside out.

 This is how the v-tree is rendered through the DOM driver into the sink of the real world.
 And it is fundamentally a cycle whose output goes into the real-world "user function" and returns again as input into the central DOM source.

 ///// view(model(intent(SOURCES.DOM)))





 /////// MVI-as-embryogenetic
 2D or polar - the phase in the i/o user/computer cycle where the user is treated as a function.
 The user is both a SINK for side-effects (e.g. console.log() and rendering) and a SOURCE for intents and actions



 /////// Outside-in-IMV -
 // Intent gets Modeled and released into the user function (rendered) as a virtual DOM tree.
 // processing side-effects ---> channeled through "/// DRIVERS".
 /////// input-first (sensor) DOM source


 * @param opt {{el: string}}
 * @returns {Function}
 */

export default function scroller(opt) {

    console.log("scroller is ... ", opt);

    return function (opt2) {

        console.log("(opt2) is ... ", (opt2));

        /////// Outside-in-IMV -
        // Intent gets Modeled and released into the user function (rendered) as a virtual DOM tree.
        // processing side-effects ---> channeled through "/// DRIVERS".

        /////// input-first (sensor) DOM source

        //// -_-> /////// INTENT-ACTION - Takes the DOM driver SOURCE interface to the outside intent and returns "input" mapped as value
        function intent(DOMBody) {
            console.log("DOMBody is ... ", DOMBody);
            return DOMBody.select("#" + opt.el)
                .events('scroll')
                .map(e => {
                    console.log("e is ... ", e);
                    return e.target.scrollTop;
                });
        }

        ///// MODEL-STATE - (no side effects)
        function model(scrollAction$) {

            console.log("scrollAction$ is ... ", scrollAction$);
            let scrollTop$ = scrollAction$.startWith(0);
            let state$ = O.combineLatest(
                scrollTop$,
                (scrolltop) => {
                    console.log("model: scrolltop is ... ", scrolltop);
                    return scrolltop;
                }
            );
            return state$;
        }


        /////// output-last (effector) DOM write or sink

        ///// VIEW-TREE - render state - effector - rendering visual (sink) output for side-effects in the real world
        function view(scrollState$) { /////// ---> //// vTree output to DOM driver
            console.log("view: scrollState$ is ... ", scrollState$);
            return scrollState$.map(state => {
                console.log("state is ... ", state);
                //---> DIV has to match in selection with makeDOMDriver in the run Cycle
                return div({id: opt.el}, [
                    div({id: "screen"}, [
                        p("scroll: " + state)
                    ])
                ]);
            });

        }


        /////// IO-CYCLE- -> i/o - source/sink -->  mvi cycle, and DOM-link - for interfacing with side-effects or /// DRIVERS
        function MAIN(SOURCES) {
            return {
                DOM: view(model(intent(SOURCES.DOM)))
            };
        }

        /////// /////// SIDE-EFFECTS  --- in and out ... through drivers
        const DRIVERS = {
            //// SINKS --->
            DOM: makeDOMDriver("#" + opt.el) // eg. "#main"
        };

        //// one-function api
        Cycle.run(MAIN, DRIVERS);


    };

}


function main(DOMSource) { // ---> output is DOM sink or vTree$
    return DOMSource.select(opt.el)
        // intent
        .events('scroll')
        .map(e => {
            console.log("e is ... ", e);
            return e.target.scrollTop;
        })
        // model
        .startWith(0)
        .map((scrolltop) => {
            console.log("model: scrolltop is ... ", scrolltop);
            return scrolltop;
        })
        // view
        .map(state => {
            console.log("state is ... ", state);
            //---> DIV
            return div({id: opt.el}, [
                div([
                    label('mvi-mod:: Property: ' + state + 'amounts'),
                    input('.prop', {type: 'range', min: 40, max: 150, value: state})
                ])
            ])
        });
}

/*

 function main(DOMBody) {

 //// -_-> /////// INTENT-ACTION - Takes the DOM driver SOURCE interface to the outside intent and returns "input" mapped as value
 return DOMBody.select(opt.el)
 .events('scroll')
 .map(e => {
 console.log("e is ... ", e);
 return e.target.scrollTop;
 })

 ///// MODEL-STATE - (no side effects)
 .startWith(0)
 .map((scrolltop) => {
 console.log("model: scrolltop is ... ", scrolltop);
 return scrolltop;
 })

 ///// VIEW-TREE - render state - effector - rendering visual (sink) output for side-effects in the real world
 .map(state => {
 console.log("state is ... ", state);
 //---> DIV
 return div({id: opt.el}, [
 div([
 label('mvi-mod:: Property: ' + state + 'amounts'),
 input('.prop', {type: 'range', min: 40, max: 150, value: state})
 ])
 ])
 });
 }

 */
