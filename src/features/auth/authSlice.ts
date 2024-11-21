import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, fetchUserInfo, verifyEmail } from './authAPI';
import { AuthState, LoginResponse, UserInfo } from './authTypes';

const initialState: AuthState = {
  token: null,
  user: { email: '', role: '', isVerified: false },
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = { email: '', role: '', isVerified: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.user = action.payload;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.user.isVerified = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
