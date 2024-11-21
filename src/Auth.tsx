import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { login, fetchUserInfo, verifyEmail } from './features/auth/authAPI';
import { logout } from './features/auth/authSlice';

const Auth: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { token, user, isLoading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  const handleFetchUserInfo = () => {
    dispatch(fetchUserInfo());
  };

  const handleVerifyEmail = () => {
    dispatch(verifyEmail({ code }));
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
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter verification code" />
              <button onClick={handleVerifyEmail}>Verify Email</button>
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Auth;
