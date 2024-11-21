import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginPayload, LoginResponse, UserInfo } from './authTypes';

// Login API call
export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>('/api/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Fetch user info
export const fetchUserInfo = createAsyncThunk<UserInfo>(
  'auth/fetchUserInfo',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;
    try {
      const response = await axios.get<UserInfo>('/api/auth/user-info', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Fetching user info failed');
    }
  }
);

// Verify email
export const verifyEmail = createAsyncThunk<void, { code: string }>(
  'auth/verifyEmail',
  async ({ code }, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;
    try {
      await axios.post('/api/auth/verify-email', { code }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Email verification failed');
    }
  }
);
