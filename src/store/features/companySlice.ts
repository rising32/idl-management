import { createSlice } from '@reduxjs/toolkit';
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

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyInfo: (state, action) => {
      state.admin_info = action.payload.company.admin_info;
      state.client_count = action.payload.company.client_count;
      state.company_id = action.payload.company.company_id;
      state.company_name = action.payload.company.company_name;
      state.member_count = action.payload.company.member_count;
      state.project_count = action.payload.company.project_count;
      state.task_count = action.payload.company.task_count;
    },
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
});

export const { setCompanyInfo, updateCompanyName, changeMemberCount, changeClientCount, changeProjectCount, changeTaskCount } =
  companySlice.actions;

export default companySlice.reducer;
