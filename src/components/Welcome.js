import React from 'react';

const Welcome = ({ user }) => (
  <div>
    <h1>Welcome, {user.email}!</h1>
  </div>
);

export default Welcome;
