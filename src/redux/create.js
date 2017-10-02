/* global __DEVELOPMENT__, __CLIENT__, __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import createLogger from 'redux-logger';
import createMiddleware from './clientMiddleware';
import { persistState } from 'redux-devtools';
import DevTools from '../DevTools';
import reducer from './rootReducer';

const logger = createLogger();

export default
function(client) {
    const middleware = createMiddleware(client);
    let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    finalCreateStore = compose(
        applyMiddleware(thunk ,middleware, multi, logger),
      DevTools.instrument(),
        persistState(),
    )(createStore);
  } else {
      finalCreateStore = applyMiddleware(thunk ,middleware, multi)(createStore);
  }
  return finalCreateStore(reducer);
}
