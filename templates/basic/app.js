const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const net = require('net');
const path = require('path');
require('dotenv').config();

const startPort = process.env.PORT || 3000;
const msg = process.env.MSG_ROOT || "segfaultandsegmentationfault";
const html = process.env.HTML_FILE || "./public/nonehtml.html";
const a = process.env.RESPONSE || "ok";

// CORS
fastify.register(cors, {
  origin: true
});

// GET /
fastify.get('/', async (request, reply) => {
  return msg;
});

// GET /html
fastify.get('/html', async (request, reply) => {
  console.log(`Request Approval Status: ${a}`);

  const allowed = ['ok', 'on'];

  if (!allowed.includes(a)) {
    return 'not at all!';
  }

  return reply
    .type('text/html')
    .sendFile(path.join(__dirname, html));
});

// POST /api
fastify.post('/api', async (request, reply) => {
  return { received: request.body };
});

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => resolve(false));

    server.once('listening', () => {
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
}

async function findPort(start = 3000) {
  let port = start;

  while (!(await checkPort(port))) {
    console.log(`⚠️ Port ${port} in use`);
    port++;
    console.log(`⚠️ trying port ${port}`);
  }

  return port;
}

async function start() {
  const PORT = await findPort(startPort);

  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
