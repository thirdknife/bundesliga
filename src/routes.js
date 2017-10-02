import { Route } from 'react-router';
import React from 'react';
import App from './App';
import Front from 'Front';
import All from 'All';
import Ratio from 'Ratio';

export default (
    <Route path="/" component={App} onEnter={onEnter} onChange={onChange}>
        <Route path='Front' components={{ parent: Front.container }}/>
        <Route path='All' components={{ parent: All.container }}/>
        <Route path='Ratio' components={{ parent: Ratio.container }}/>
    </Route>
);

function onEnter(state, callback) {

    const { pathname } = state.location;

    callback();
}

function onChange(prevState, nextState, replace, callback) {

    const { pathname } = nextState.location;

    callback();
}
