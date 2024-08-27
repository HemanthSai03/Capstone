import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import client from '../apolloClient';
import AuthForm from './Authform';
import Welcome from './Welcome';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Authentication setUser={setUser} />}
          />
          <Route
            path="/welcome"
            element={<Welcome user={user} />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

const Authentication = ({ setUser }) => {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const handleAuthSuccess = (user) => {
    setUser(user);
    navigate('/welcome'); // Redirect to welcome page after login
  };

  const handleSignupSuccess = () => {
    setIsSignup(false); // Switch to login form after signup
  };

  return (
    <div>
      <h1>Authentication</h1>
      <button onClick={() => setIsSignup(true)}>Sign Up</button>
      <button onClick={() => setIsSignup(false)}>Login</button>
      <AuthForm
        isSignup={isSignup}
        onAuthSuccess={handleAuthSuccess}
        handleSignupSuccess={handleSignupSuccess}
      />
    </div>
  );
};

export default App;
