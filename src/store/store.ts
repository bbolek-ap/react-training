import {configureStore} from '@reduxjs/toolkit';
import projectReducer from './projects/projectSlice';

export const store = configureStore({
    reducer: {
        project: projectReducer,
    }
});

export type RootState =ReturnType<typeof store.getState>;
