import * as a from './actionTypes';
import * as helpers from './helpers';

export
function requestData() {

    return {
        types: [a.REQUEST_RATIO_DATA,
                a.REQUEST_RATIO_DATA_SUCCESS,
                a.REQUEST_RATIO_DATA_FAILURE],

        promise: () => helpers.requestData()
    };
}
