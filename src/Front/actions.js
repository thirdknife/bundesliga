import * as a from './actionTypes';
import * as helpers from './helpers';

export
function setReImportMode(status) {

    return {
        type: a.SET_REIMPORT_MODE,
        status
    };
}

export
function requestData() {

    return {
        types: [a.REQUEST_MATCH_DATA,
                a.REQUEST_MATCH_DATA_SUCCESS,
                a.REQUEST_MATCH_DATA_FAILURE],

        promise: () => helpers.requestData()
    };
}
