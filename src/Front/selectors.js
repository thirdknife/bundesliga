import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getAll = state => state.get(NAME);
export const currentGroupMatches = state => getAll(state).get('currentGroupMatches');
export const nextGroupMatches = state => getAll(state).get('nextGroupMatches');

export
const props = createSelector(
    currentGroupMatches,
    nextGroupMatches,
    (currentGroupMatches, nextGroupMatches) => ({
        currentGroupMatches,
        nextGroupMatches
    })
);
