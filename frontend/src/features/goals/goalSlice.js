import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new goal
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData, token);  
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message);    
    }
})

// Get user goals
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoals(token);    
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message);       
    }
});

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: function(state) {
            // If I update the state from here it causes an infinite loop
            // I have no idea how to deal with it
        }
    },
    extraReducers: (builer) => {
        builer
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;