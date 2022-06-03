import { createSlice } from '@reduxjs/toolkit';
import { CoreState } from '../../modules/core';

const initialState: CoreState = {
  layer: false,
  auth: {
    visible: false,
    mode: 'LOGIN',
  },
  user: null,
  token: null,
  setting: {
    as_id: null,
    date_format: 0,
    time_format: 0,
    currency: 0,
    decimal_seperator: 0,
  },
  local: 'fr',
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
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setSetting: (state, action) => {
      state.setting = action.payload;
    },
  },
});

export const { setLayer, setUser, setSetting } = coreSlice.actions;

export default coreSlice.reducer;
