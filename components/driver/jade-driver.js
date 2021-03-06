import {Observable} from 'rx';
import _ from 'ramda';
//import jsondiffpatch from 'jsondiffpatch';

var jade = require("jade");
var babel = require("jade-babel");

jade = babel({}, jade);


function makeJadeDriver(opts) {
    //var renderer = PIXI.autoDetectRenderer(width, height);
    //var stage = new PIXI.Container();
    // Store of Pixi graphics, by id
    //var views = {};

    //stage.interactive = true;

    //el.appendChild(renderer.view);

    function jadeDriver($view) {

        $view.forEach(view => {
            view.graphics.forEach(graphic => {
                    //if (!views[graphic.id]) {
                    //    views[graphic.id] = new PIXI.Graphics();
                    //    stage.addChild(views[graphic.id]);
                    //}
                    //else {
                    //    views[graphic.id].clear();
                    //}
                    //let view = views[graphic.id];
                    //
                    //let update = ({
                    //    circle: updateCircle,
                    //    rectangle: updateRectangle
                    //})[graphic.type];
                    //
                    //if (!update) {
                    //    throw new Error(`Invalid graphic type ${graphic.type}`);
                    //}

                    update(view, graphic);
                }
            );

            //---> jade.render?
            //renderer.render(stage);
        })
    }


    return jadeDriver;
}

//function updateCircle(circle, graphic) {
//    circle.lineStyle(0);
//    circle.beginFill(graphic.fill, graphic.alpha);
//    circle.drawCircle(
//        Math.round(graphic.x),
//        Math.round(graphic.y),
//        Math.round(graphic.radius)
//    );
//    circle.endFill();
//}
//
//function updateRectangle(rectangle, graphic) {
//    rectangle.lineStyle(0);
//    rectangle.beginFill(graphic.fill, graphic.alpha);
//    rectangle.drawRect(graphic.x, graphic.y, graphic.width, graphic.height);
//    rectangle.endFill();
//}

export default makeJadeDriver;