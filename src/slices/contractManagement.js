import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {createContracts, getAll, update, getCustom, getById} from '../services/contractManagement';


const initialState = {
  data: [],
  totalItem: 0,
  custom:[],
  contractById:null,
  refreshData: false,
};

export const createContract = createAsyncThunk(
  'contractManagement/createContract',
  async (payload) => {
    const res = await createContracts(payload);
    return res.data;
  }
);

export const getCustoms = createAsyncThunk(
  'contractManagement/getCustoms',
  async (payload) => {
    const res = await getCustom(payload);
    return res.data;
  }
);

// export const getByIds = createAsyncThunk(
//   'contractManagement/getContractId',
//   async (payload) => {
//     const res = await getById(payload);
//     return res.data;
//   }
// );

export const updateContract = createAsyncThunk(
  'contractManagement/createContract',
  async ({id,data}) => {
    const res = await update({id,data});
    return res.data;
  }
);

export const retrieveData = createAsyncThunk(
  'contractManagement/retrieveData',
  async (payload) => {
    const res = await getAll(payload);
    return res.data;
  }
);

const contractManagement = createSlice({
  name: 'contractManagement',
  initialState,
  reducers:{
    setRefresh:(state, action)=>{
      state.refreshData=false
    },
  },
  extraReducers: {
    [createContract.fulfilled]: (state) => {
      state.refreshData = true
    },
    [retrieveData.fulfilled]: (state, action) => {
      state.data = [...action.payload.contracts];
      state.totalItem=action.payload.contractsCount
    },
    [getCustoms.fulfilled]: (state, action) => {
      state.custom = [...action.payload.data]
    },
    [updateContract.fulfilled]: (state) => {
      state.refreshData = true
    }
  },
});

export const {setRefresh}= contractManagement.actions

const { reducer } = contractManagement;

export default reducer;
