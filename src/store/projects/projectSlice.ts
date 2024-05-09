import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Project} from '../../models/project.model.ts';

export interface ProjectState {
    project: Project | undefined;
    isLoading: boolean;
}

const initialState: ProjectState = {
    project: undefined,
    isLoading: false,
}

export const projectSlice = createSlice({
    name: "projects",
    initialState: initialState,
    reducers: {
        setProject: (state, action: PayloadAction<Project>) => {
            state.project = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
})

export const {setProject, setLoading} = projectSlice.actions;
export default projectSlice.reducer;
