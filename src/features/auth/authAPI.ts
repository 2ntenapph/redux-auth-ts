import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginPayload, LoginResponse, SignupPayload, UserInfo } from './authTypes';

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:4002'; // Replace with your API Gateway URL

// Signup API call
export const signup = createAsyncThunk<void, SignupPayload>(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      await axios.post('/auth/signup', credentials); // Adjusted endpoint for signup
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Signup failed. Please try again.'
      );
    }
  }
);

// Login API call
export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>('/auth/login', credentials); // Adjusted endpoint
      return response.data;
    } catch (error: any) {
      // Normalize error to return consistent structure
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  }
);

// Fetch user info
export const fetchUserInfo = createAsyncThunk<UserInfo>(
  'auth/fetchUserInfo',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue('Unauthorized: Token is missing');
    }

    try {
      const response = await axios.get<UserInfo>('/auth/user-info', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user information.'
      );
    }
  }
);

// Verify email
export const verifyEmail = createAsyncThunk<void, { email: string, otp: string }>(
  'auth/verifyEmail',
  async ({ email, otp }, { rejectWithValue }) => {
   

    try {
      await axios.post(
        '/auth/verify-email',
        { email, otp },
      );
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Email verification failed. Please try again.'
      );
    }
  }
);
