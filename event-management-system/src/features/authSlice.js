import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  authUser: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const { code, role } = user;
      let response = await axios.post("https://nems-backend-ca39b17ab689.herokuapp.com/api/v1/users/login",
        {
          code: code,
          role: role
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      let data = await response.data;
      console.log('DATA', data);
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.authUser = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload.error;
    });
  },
})

export const { setAuthUser } = authSlice.actions

export default authSlice.reducer