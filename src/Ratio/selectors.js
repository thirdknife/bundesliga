import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getAll = state => state.get(NAME);
export const teamRatios = state => getAll(state).get('teamRatios');
export const isLoading = state => getAll(state).get('isLoading');

export
const props = createSelector(
    teamRatios, isLoading,
    (teamRatios, isLoading) => ({
        teamRatios, isLoading
    })
);
