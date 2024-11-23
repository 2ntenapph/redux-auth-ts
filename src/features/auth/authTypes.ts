// Login payload (sent to API)
export interface LoginPayload {
    email: string;
    password: string;
  }

  export interface SignupPayload {
    email: string;
    password: string;
    role: string;
  }
  
  
  // Login response (received from API)
  export interface LoginResponse {
    token: string;
    user: UserInfo;
  }
  
  // User info (part of state)
  export interface UserInfo {
    email: string;
    role: string;
    isVerified: boolean;
  }
  
  // Authentication state in Redux
  export interface AuthState {
    token: string | null;
    user: UserInfo;
    isLoading: boolean;
    error: string | null;
  }
  