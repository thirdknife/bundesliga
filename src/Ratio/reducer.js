import Immutable from 'immutable';
import * as a from './actionTypes';

const initialState = Immutable.fromJS({
    teamRatios: {},
});

export default
function reducer(state = initialState, action) {

    const { type } = action;

    switch(type) {

    case a.REQUEST_RATIO_DATA_SUCCESS: {

        const { allTeamsWithDefaultRatio } = action.result;

        return state.set('teamRatios', Immutable.fromJS(allTeamsWithDefaultRatio));
    }

    default:
        return state;
    }
}
