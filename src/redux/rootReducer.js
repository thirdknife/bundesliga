import { combineReducers } from 'redux-immutablejs';
import Front from 'Front';
import All from 'All';
import Ratio from 'Ratio';

export default
combineReducers({
    [Front.constants.NAME]: Front.reducer,
    [All.constants.NAME]: All.reducer,
    [Ratio.constants.NAME]: Ratio.reducer,
});
