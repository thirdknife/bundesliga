import * as a from './actionTypes';
import * as helpers from './helpers';

export
function requestData() {

    return {
        types: [a.REQUEST_ALL_MATCHES_DATA,
                a.REQUEST_ALL_MATCHES_SUCCESS,
                a.REQUEST_ALL_MATCHES_FAILURE],

        promise: () => helpers.requestData()
    };
}
