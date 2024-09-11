import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  events: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
}

export const fetchAllEvents = createAsyncThunk(
    "event/fetchAllEvents",
    async (thunkAPI) => {
      try {
        const response = await axios.get(`/events`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

export const addEvent = createAsyncThunk(
    "event/addEvent",
    async (event, thunkAPI) => {
      try {
        const { name, description } = event;
        const response = await axios.post(`/event/create`, {
          name,
          description,
        });
        return response.data;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEvents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(fetchAllEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.isError = false;
    });
    builder.addCase(addEvent.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data.unshift(action.payload.event);
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
  },
})

export const { setEvents } = eventSlice.actions

export default eventSlice.reducer