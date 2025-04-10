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

      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
      const appHtml = render(url);

      const html = template.replace('<!--app-->', appHtml);
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
      try {
        const templatePath = path.resolve(__dirname, '../index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(req.url, template);
  
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (err) {
        vite.ssrFixStacktrace(err);
        console.error('Client route error:', err);
        res.status(500).end('Internal Server Error');
      }
    });
  });

  app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
  });
}

startServer();
