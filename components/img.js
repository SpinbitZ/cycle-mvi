import Cycle from '@cycle/core';
import {div, input, label,p, makeDOMDriver} from '@cycle/dom';
import * as Rx from 'rx';
import RDOM from 'rx-dom';
Rx.DOM = RDOM.DOM;

import scrollIntent from './scrollIntent';

const O = Rx.Observable; //!!
console.log("Rx.DOM is ... ", Rx.DOM);


/**
 ////// Cycle-MVI-as-UI-Recursion

 Cycle.js is a "pure" form of a functional and reactive unidirectional data-flow.

 Cycle is not a circle, but a spiral.

 Nature wants to flow in a cycle.  Shake a bottle of water vigorously and you will get a vortex naturally.

 # -Cycles are coherent systems of flow. Nature prefers order out of chaos.

 Software also has natural cycles and is capable of coherent flow, minimizing chaos complexity and disorder.

 # -There will be flow in any application, but coherence in flow is maximally simple flow.

 Challenge: Find a UI that doesn't function in some way as a cycle.

 Goal: Strive for coherence.


 # -Cycles as spirals

 Circles are closed off and dead.  The circle has to be broken into a spiral before it can begin to be dynamic.

 screenEvents = computer(interactionEvents)
 interactionEvents = user(screenEvents)

 a = f(b)
 b = g(a)

 # -PROBLEM? interactionEvents is used before it is ever defined.

 there is a 'circular' or rather a cyclical dependency here which you can see clearly in the composition or 'point-free' style:


 b = g(f(b))

 The problem is with the assignment.  In math this is an equation, not an assignment.

 Specifically this is the fixed-point equation.





 interactionEvents = user(computer(interactionEvents))





 a, or interactionEvents is the output of processing itself as input...
 ... and round it goes.





 Replace beginning with suitable proxy to bootstrap the process.




 # -model-centric-cycle-flow

 # -As functional flow it looks more like IVM, but a focus on the central role of the model gives us MVI.

 Linearly the functional flow is outside in, cycling with implicit USER function.
 # -USER: From the DOM source (user: read or input from),
 ## INTENT: transforming into focused intent,
 ## MODEL: then modelled as data input for the view (sink)
 ## VIEW: DOM driver for feeding back into the USER input or sink function and to return again into the DOM source, U.
 # -USER: DOM sink (user: write or render to)

 USER function via DOM drivers is the implicit output for the DOMSource input here.

 //

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

    console.log("opt is ... ", opt);

    return function (opt2) {


        console.log("opt2 is ... ", opt2);


        /////// Outside-in-IMV -
        // Intent gets Modeled and released into the user function (rendered) as a virtual DOM tree.
        // processing side-effects ---> channeled through "/// DRIVERS".

        /////// input-first (sensor) DOM source

        //// -_-> /////// INTENT-ACTION - Takes the DOM driver SOURCE interface to the outside intent and returns "input" mapped as value
        function intent(SOURCES) {


            console.log("intent: SOURCES is ... ", SOURCES);

            //const scroll$ = SOURCES.SCROLL.select("body").events('scroll');
            //
            //console.log("scroll$ is ... ", scroll$);
            //
            //
            //scroll$.subscribe(function (evt) {
            //    console.log("evt is ... ", evt);
            //});


            //console.log("SOURCES is ... ", SOURCES);
            return SOURCES.DOM.select("#" + opt.el)
                .events('scroll')
                .map(e => {
                    //console.log("e is ... ", e);
                    return e.target.scrollTop;
                });
        }

        ///// MODEL-STATE - (no side effects)
        function model(scrollAction$) {

            console.log("model: scrollAction$ is ... ", scrollAction$);
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
                console.log("view: state is ... ", state);
                //---> DIV has to match in selection with makeDOMDriver in the run Cycle
                return div({
                    id: opt.el,
                    className: "hero-top"
                }, [
                    div({id: "screen"}, [
                        div({id:"hero"},[
                            img({uri:""}),
                            div({id:"canvas"}),
                            p("scroll: " + state)
                        ])
                    ])
                ]);
            });
        }


        /////// IO-CYCLE- -> i/o - source/sink -->  mvi cycle, and DOM-link - for interfacing with side-effects or DRIVERS
        function MAIN(SOURCES) {
            return {
                DOM: view(model(intent(SOURCES)))
            };
        }

        /////// /////// SIDE-EFFECTS  --- in and out ... through drivers
        const DRIVERS = {
            //// SINKS --->
            DOM: makeDOMDriver("#" + opt.el) // eg. "#main"
        };

        //// one-function api
        Cycle.run(MAIN, DRIVERS);


        return MAIN;
    };

}
