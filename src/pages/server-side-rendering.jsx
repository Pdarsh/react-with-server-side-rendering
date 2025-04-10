import React from 'react';
import axios from 'axios';

const ServerSideRendering = ({ data }) => {
  return (
    <div>
      <h1>Server-Side Rendering</h1>
      {data?.length > 0 ? (
        <ul>
          {data.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p style={{ color: 'red' }}>Could not make API call on server side.</p>
      )}
    </div>
  );
};

// Simulate getServerSideProps
// eslint-disable-next-line react-refresh/only-export-components
export async function fetchData() {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    return res.data;
  } catch {
    return null;
  }
}

export default ServerSideRendering;
