import {RootState} from '../store.ts';
import {createSelector} from '@reduxjs/toolkit';

export const appSelectors = (state: RootState) => state.app;

export const selectCurrentUser = () => {
    return createSelector(
        appSelectors,
        projectState => projectState.user
    )
}
