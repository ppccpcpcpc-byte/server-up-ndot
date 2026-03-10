const express = require('express');
const cors = require('cors');
const net = require('net');
const path = require('path');
require('dotenv').config();

const app = express();
const startPort = process.env.PORT || 3000;
const msg = process.env.MSG_ROOT || "segfaultandsegmentationfault";
const html = process.env.HTML_FILE || "./public/nonehtml.html"
app.use(cors());
app.use(express.json());

// GET
app.get('/', (req, res) => {
  res.send(`${msg}`);
});

//html
app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, `${html}`));
});

// POST
app.post('/api', (req, res) => {
  res.json({ received: req.body });
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
    console.log(`⚠️trying port ${port}`)
  }

  return port;
}

async function start() {
  const PORT = await findPort(startPort);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start();
