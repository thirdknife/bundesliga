import Immutable from 'immutable';
import * as a from './actionTypes';

const initialState = Immutable.fromJS({
    currentGroupMatches: {},
    nextGroupMatches: {},
    currentGroup: -1,
});

export default
function reducer(state = initialState, action) {

    const { type } = action;

    switch(type) {

    case a.REQUEST_MATCH_DATA_SUCCESS: {

        const { currentGroup, currentGroupMatches, nextGroupMatches } = action.result;

        return state.set('currentGroup', currentGroup)
            .set('nextGroupMatches', Immutable.fromJS(nextGroupMatches))
            .set('currentGroupMatches', Immutable.fromJS(currentGroupMatches));
    }

    default:
        return state;
    }
}
