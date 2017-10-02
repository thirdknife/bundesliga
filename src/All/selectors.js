import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getAll = state => state.get(NAME);
export const allMatches = state => getAll(state).get('allMatches');
export const isLoading = state => getAll(state).get('isLoading');

export
const props = createSelector(
    allMatches, isLoading,
    (allMatches, isLoading) => ({
        allMatches, isLoading
    })
);
