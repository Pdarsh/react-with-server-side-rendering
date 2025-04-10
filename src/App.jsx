import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientSideRendering from './pages/client-side-rendering';
import ServerSideRendering from './pages/server-side-rendering';
import Virtualization from './pages/virtualization';
import NavBar from './components/navbar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/client-side-rendering" element={<ClientSideRendering />} />
        <Route path="/server-side-rendering" element={<ServerSideRendering />} />
        <Route path="/virtualization" element={<Virtualization />} />
      </Routes>
    </>
  );
}

export default App;
