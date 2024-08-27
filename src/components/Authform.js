import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../graphql/mutations';
import {jwtDecode} from 'jwt-decode';

const AuthForm = ({ isSignup, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({ variables: { email, password } });
      console.log('Signup response:', data); // Log response
      // Example: Token might be returned in data.signup.token
      const token = data.signup.token; 
      const user = jwtDecode(token);
      localStorage.setItem('token', token);
      onAuthSuccess(user);
    } catch (err) {
      console.error('Error during signup:', err); // Log error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;
