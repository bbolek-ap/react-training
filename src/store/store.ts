import {configureStore} from '@reduxjs/toolkit';
import projectReducer from './projects/projectSlice';
import appReducer from './app/appSlice.ts';

export const store = configureStore({
    reducer: {
        project: projectReducer,
        app: appReducer
    }
});

export type RootState =ReturnType<typeof store.getState>;
