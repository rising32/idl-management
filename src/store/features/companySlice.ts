import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/api';
import { userURL } from '../../lib/api/URL';
import { CompanyInfoState } from '../../modules/company';

const initialState: CompanyInfoState = {
  admin_info: null,
  client_count: 0,
  company_id: 0,
  company_name: '',
  member_count: 0,
  project_count: 0,
  task_count: 0,
};

export const getCompanyInfo = createAsyncThunk('user/companyInfo', async (params: { user_id: number }) => {
  const response = await apiClient.post(userURL.companyProfile, params);
  return response.data as { company: CompanyInfoState };
});

export const companySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCompanyName: (state, action) => {
      state.company_name = action.payload.company_name;
    },
    changeMemberCount: state => {
      state.member_count += 1;
    },
    changeClientCount: state => {
      state.client_count += 1;
    },
    changeProjectCount: state => {
      state.project_count += 1;
    },
    changeTaskCount: state => {
      state.task_count += 1;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCompanyInfo.fulfilled, (state, action) => {
      state.admin_info = action.payload.company.admin_info || null;
      state.client_count = action.payload.company.client_count || 0;
      state.company_id = action.payload.company.company_id || 0;
      state.company_name = action.payload.company.company_name || '';
      state.member_count = action.payload.company.member_count || 0;
      state.project_count = action.payload.company.project_count || 0;
      state.task_count = action.payload.company.task_count || 0;
    });
  },
});

export const { updateCompanyName, changeMemberCount, changeClientCount, changeProjectCount, changeTaskCount } = companySlice.actions;

export default companySlice.reducer;
