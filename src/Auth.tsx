import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { login, signup, fetchUserInfo, verifyEmail } from './features/auth/authAPI';
import { logout } from './features/auth/authSlice';

const Auth: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { token, user, isLoading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [signupMode, setSignupMode] = useState(false); // Toggle between login and signup
  const [showVerification, setShowVerification] = useState(false); // Show after signup

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  const handleSignup = async () => {
    await dispatch(signup({ email, password, role: "user" })).unwrap();
    setShowVerification(true); // Show verification field after successful signup
  };

  const handleFetchUserInfo = () => {
    dispatch(fetchUserInfo());
  };

  const handleVerifyEmail = () => {
    dispatch(verifyEmail({ email, otp }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {token ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <p>Role: {user.role}</p>
          <p>Email Verified: {user.isVerified ? 'Yes' : 'No'}</p>
          <button onClick={handleFetchUserInfo}>Fetch User Info</button>
          {!user.isVerified && (
            <div>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter verification code"
              />
              <button onClick={handleVerifyEmail}>Verify Email</button>
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>{signupMode ? 'Sign Up' : 'Login'}</h2>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {signupMode ? (
            <button onClick={handleSignup}>Sign Up</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
          <p>
            {signupMode
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setSignupMode(!signupMode);
                setShowVerification(false); // Reset verification state
              }}
            >
              {signupMode ? 'Login' : 'Sign Up'}
            </button>
          </p>
          {showVerification && (
            <div>
              <p>Please verify your email to continue:</p>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter verification code"
              />
              <button onClick={handleVerifyEmail}>Verify Email</button>
            </div>
          )}
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && (
        <p style={{ color: 'red' }}>
          {typeof error === 'string' ? error : 'An unexpected error occurred'}
        </p>
      )}
    </div>
  );
};

export default Auth;
