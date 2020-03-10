import React, { useState, useEffect } from 'react';
import axious from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axious.get('/api/users').then(response => setUsers(response.data));
  }, []);

  return (
    <div>
      <div>My Template</div>
      <ul>
        {users.map(user => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
