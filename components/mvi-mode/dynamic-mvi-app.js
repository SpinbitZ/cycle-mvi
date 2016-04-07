/** @jsx hJSX */
import { makeDOMDriver, hJSX } from '@cycle/dom';
import { Observable } from 'rx';
import combineLatestObj from 'rx-combine-latest-obj';
import DynamicComponent from './dynamic';

import {mvi} from './mvi-mode';

export default function dynamic({el}) {
    function vtree(sources) {
        const componentVtrees$ = combineLatestObj({
            dynamicComponent1$: DynamicComponent(sources).DOM,
            dynamicComponent2$: DynamicComponent(sources).DOM
        });

        const vtree$ = componentVtrees$.map(vtrees =>
            <div>
                {vtrees.dynamicComponent1}
                {vtrees.dynamicComponent2}
            </div>
        );
        return vtree$;
    }

    return mvi({el, vtree});
}