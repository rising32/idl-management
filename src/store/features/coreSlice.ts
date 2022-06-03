import { createSlice } from '@reduxjs/toolkit';
import { CoreState } from '../../modules/core';

const initialState: CoreState = {
  layer: false,
  auth: {
    visible: false,
    mode: 'LOGIN',
  },
  user: null,
  popup: {
    visible: false,
    title: '',
    message: '',
  },
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setLayer: (state, action) => {
      state.layer = action.payload;
    },
    setUser: (state, { payload: user }) => {
      state.user = user;
    },
  },
});

export const { setLayer, setUser } = coreSlice.actions;

export default coreSlice.reducer;
