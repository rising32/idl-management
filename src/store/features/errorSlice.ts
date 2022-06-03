import { createSlice } from '@reduxjs/toolkit';

export type ErrorState = {
  errorType: 'NOT_FOUND' | 'CRASHED' | null;
};

const initialState: ErrorState = {
  errorType: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showNotFoundError(state) {
      state.errorType = 'NOT_FOUND';
    },
    resetError(state) {
      state.errorType = null;
    },
  },
});
export const { showNotFoundError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
