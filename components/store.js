/**
 */

function store(action$){
    return makeReducerStream(action$)
        .scan((state, reducer) => reducer(state), initialState)
        .shareReplay(1);
}