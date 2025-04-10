import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.get('/server-side-rendering', async (req, res) => {
    try {
      const url = req.originalUrl;
      const templatePath = path.resolve(__dirname, '../index.html');
      let template = fs.readFileSync(templatePath, 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      // 👇 Import and call fetchData from the component
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
      const { fetchData } = await vite.ssrLoadModule('/src/pages/server-side-rendering.jsx');
      const data = await fetchData();
      console.log(data);

      const appHtml = render(url, data);

      const html = template
        .replace('<!--app-->', appHtml)
        .replace('__INITIAL_DATA__', JSON.stringify(data));

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      console.error(err);
      res.status(500).end(err.message);
    }
  });

  const clientRoutes = ['/', '/client-side-rendering', '/virtualization'];
  clientRoutes.forEach((route) => {
    app.get(route, async (req, res) => {
      const templatePath = path.resolve(__dirname, '../index.html');
      let template = fs.readFileSync(templatePath, 'utf-8');
      template = await vite.transformIndexHtml(req.url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    });
  });

  app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
  });
}

startServer();
