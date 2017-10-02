import Immutable from 'immutable';
import * as a from './actionTypes';

const initialState = Immutable.fromJS({
    allMatches: {},
    isLoading: true,
});

export default
function reducer(state = initialState, action) {

    const { type } = action;

    switch(type) {

        case a.REQUEST_ALL_MATCHES_DATA:{
            return state.set('isLoading', true);
        }

    case a.REQUEST_ALL_MATCHES_SUCCESS: {

        const { allMatches } = action.result;

        return state.set('allMatches', Immutable.fromJS(allMatches))
            .set('isLoading', false);
    }

    default:
        return state;
    }
}
