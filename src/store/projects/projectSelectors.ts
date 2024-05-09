import {RootState} from '../store.ts';
import {createSelector} from '@reduxjs/toolkit';

export const projectSelectors = (state: RootState) => state.project;


export const selectCurrentProject = () => {
    return createSelector(
        projectSelectors,
        projectState => projectState.project
    )
}


export const selectIsLoading = () => {
    return createSelector(
        projectSelectors,
        projectState => projectState.isLoading
    )
}
