import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getAll = state => state.get(NAME);
export const teamRatios = state => getAll(state).get('teamRatios');

export
const props = createSelector(
    teamRatios,
    (teamRatios) => ({
        teamRatios
    })
);
