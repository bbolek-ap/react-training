import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/user.model.ts';

export interface AppState {
    user: User | undefined;
}

const initialState: AppState = {
    user: undefined
}

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
})

export const {setUser} = appSlice.actions;
export default appSlice.reducer;
