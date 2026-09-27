import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const root = resolve('out');
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex < 0 ? 3000 : process.argv[portIndex + 1]);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid port');

const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
};

createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }
  const file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(403).end();
    return;
  }
  const candidates = pathname === '/' ? [resolve(root, 'index.html')] : [file];
  if (!extname(pathname)) candidates.push(`${file}.html`, resolve(file, 'index.html'));

  for (const candidate of candidates) {
    const info = await stat(candidate).catch(() => null);
    if (!info?.isFile()) continue;
    response.writeHead(200, {
      'Content-Type':
        candidate === resolve(root, 'opengraph-image')
          ? 'image/png'
          : `${types[extname(candidate)] || 'application/octet-stream'}${['.html', '.txt', '.css', '.js', '.xml'].includes(extname(candidate)) ? '; charset=utf-8' : ''}`,
      'Content-Length': info.size,
      'X-Content-Type-Options': 'nosniff',
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(candidate).pipe(response);
    return;
  }
  const missing = resolve(root, '404.html');
  response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  if (request.method === 'HEAD') response.end();
  else createReadStream(missing).pipe(response);
}).listen(port, '127.0.0.1', () => {
  process.stdout.write(`Static preview: http://127.0.0.1:${port}\n`);
});
