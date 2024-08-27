import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import SignIn from './components/SignIn';
import Login from './components/Login';
import Welcome from './components/Welcome';

const App = () => {
  const [user, setUser] = useState(null);

  const handleAuthSuccess = (token) => {
    // Assuming token is stored and decoded to get user details
    const decodedUser = jwt_decode(token);
    setUser(decodedUser);
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn onAuthSuccess={handleAuthSuccess} />
          </Route>
          <Route path="/login">
            <Login onAuthSuccess={handleAuthSuccess} />
          </Route>
          <Route path="/welcome">
            {user ? <Welcome user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/" exact>
            <Redirect to="/signin" />
          </Route>
          <Route path="*">
            <h1>404 - Page Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
