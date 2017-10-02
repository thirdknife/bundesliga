import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getAll = state => state.get(NAME);
export const currentGroupMatches = state => getAll(state).get('currentGroupMatches');
export const nextGroupMatches = state => getAll(state).get('nextGroupMatches');
export const isLoading = state => getAll(state).get('isLoading');

export
const props = createSelector(
    currentGroupMatches,
    nextGroupMatches,
    isLoading,
    (currentGroupMatches, nextGroupMatches, isLoading) => ({
        currentGroupMatches,
        nextGroupMatches,
        isLoading
    })
);
