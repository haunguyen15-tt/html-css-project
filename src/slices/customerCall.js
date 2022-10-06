import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCustomerCallRecord,
  updateCustomerCallRecord,
  getCustomerCallById,
  getSpeechScript,
} from '../services/customerCalls';
import { creactAppointmentApi } from '../services/appointment';

const initialState = {
  callRecord: {
    createdAt: null,
    updatedAt: null,
    completedAt: null,
    deletedAt: null,
    id: 0,
    isCompleted: null,
  },
  customerInfo: null,
  customerCall: {
    noteCount: 0,
    id: 0,
    isPotential: null,
  },
  speechScript: null,
};

export const getCustomerCallsData = createAsyncThunk('customerCall/getCustomerCallsData', async (customerCallId) => {
  try {
    const response = await getCustomerCallById(customerCallId);
    return response;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const getSpeechScriptData = createAsyncThunk('customerCall/getSpeechScriptData', async (params) => {
  try {
    const response = await getSpeechScript(params);
    return response;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const updateCallRecord = createAsyncThunk('customerCall/updateCallRecord', async (params) => {
  try {
    const response = await updateCustomerCallRecord(params);
    return response;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const createAppointment = createAsyncThunk('customerCall/createAppointment', async (data) => {
  try {
    const res = await creactAppointmentApi(data);
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

const customerCallSlice = createSlice({
  name: 'customerCall',
  initialState,
  extraReducers: (builder) => {
    // GET CALL-DATA
    builder.addCase(getCustomerCallsData.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(getCustomerCallsData.fulfilled, (state, action) => {
      state.callRecord = action.payload?.latestCall;
      state.customerInfo = action.payload?.customerCall?.customer;
      state.customerCall = {
        noteCount: action.payload?.customerCall?.noteCount,
        id: action.payload?.customerCall?.id,
        isPotential: action.payload?.customerCall?.isPotential,
      };
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(getCustomerCallsData.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });

    // GET SCRIPT-DATA
    builder.addCase(getSpeechScriptData.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(getSpeechScriptData.fulfilled, (state, action) => {
      state.speechScript = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(getSpeechScriptData.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });

    // UPDATE CALL-RECORD
    builder.addCase(updateCallRecord.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(updateCallRecord.fulfilled, (state, action) => {
      // console.log('scriptData', action.payload);
      // state.speechScript = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(updateCallRecord.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });

    // CREATE APPOINTMENT
    builder.addCase(createAppointment.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      // console.log('scriptData', action.payload);
      // state.speechScript = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(createAppointment.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });
  },
});

const { reducer } = customerCallSlice;

export default reducer;
