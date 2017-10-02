import React from 'react';
import ReactDOM from 'react-dom';
import ApiClient from './ApiClient';
import createStore from './redux/create';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import routes from './routes';
import { Router, createMemoryHistory, useRouterHistory } from 'react-router';
import "babel-polyfill";

const client = new ApiClient();

const store = createStore(client);

const appHistory = useRouterHistory(createMemoryHistory)({
    basename: '/'
});

const component = (() => {
  if (__DEVTOOLS__) {
    window.React = React; // enable debugger

    return (
        <Provider store={store} key="provider">
            <div>
                <Router history={appHistory}>
                    {routes}
                </Router>
                <DevTools />
            </div>
        </Provider>
    );
  } else {

      window.React = React;
      return (
          <Provider store={store} key="provider">
              <Router history={appHistory}>
                  {routes}
              </Router>
          </Provider>
    );
  }
})();

const dest = document.getElementById("app");
appHistory.push('Front');

ReactDOM.render(component, dest);
