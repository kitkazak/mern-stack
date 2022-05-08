import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducer: {
        reset: function(state) {
            state.goals = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    }
})

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;