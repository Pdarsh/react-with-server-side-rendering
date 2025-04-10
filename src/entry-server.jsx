import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import App from './App';

export async function render(url) {
  let initialProps = {};

  // Dynamically import the matching route component and call fetchData if it exists
  if (url === '/server-side-rendering') {
    const module = await import('./pages/server-side-rendering');
    if (module.default.fetchData) {
      initialProps = await module.default.fetchData();
    }
  }

  const html = renderToString(
    <StaticRouter location={url}>
      <App initialData={initialProps} />
    </StaticRouter>
  );

  return html;
}
