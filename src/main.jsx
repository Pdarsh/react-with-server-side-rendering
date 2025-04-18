import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const initialData = window.initialData || [];

hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App initialData={initialData} />
  </BrowserRouter>
);
