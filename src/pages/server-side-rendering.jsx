import React from 'react';

const ServerSideRendering = ({ data = [] }) => {
  return (
    <div>
      <h1>Server-Side Rendering</h1>
      <p>This data is fetched on the server side and sends html file</p>
      {data.length > 0 ? (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p style={{ color: 'red' }}>Could not make API call on server side.</p>
      )}
    </div>
  );
};

export default ServerSideRendering;
