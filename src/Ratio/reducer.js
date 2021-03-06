import Immutable from 'immutable';
import * as a from './actionTypes';

const initialState = Immutable.fromJS({
    teamRatios: {},
    isLoading: true
});

export default
function reducer(state = initialState, action) {

    const { type } = action;

    switch(type) {

        case a.REQUEST_RATIO_DATA : {
            return state.set('isLoading', true);
        }

        case a.REQUEST_RATIO_DATA_SUCCESS: {

            const { allTeamsWithDefaultRatio } = action.result;

            return state.set('teamRatios', Immutable.fromJS(allTeamsWithDefaultRatio))
                .set('isLoading', false);
        }

        default:
            return state;
    }
}
