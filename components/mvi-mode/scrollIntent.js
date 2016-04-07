import * as Rx from 'rx';
import RDOM from 'rx-dom';
Rx.DOM = RDOM.DOM;




export default function scrollIntent(opt) {

    console.log("opt is ... ", opt);

    var input = document.getElementById('container');
    var source = Rx.DOM.scroll(input);

    var scroll = source.subscribe(
        function (e) {
            console.log("e.target.scrollTop is ... ", e.target.scrollTop);
            console.log("e is ... ", e);
        },
        function (err) {
            console.log('Error: ' + err);
        },
        function () {
            console.log('Completed');
        });


    return scroll;
}