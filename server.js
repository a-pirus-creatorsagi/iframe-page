const https = require('https');
const fs = require('fs');
const path = require('path');

// Self-signed certificate options
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

const server = https.createServer(options, (req, res) => {
  if (req.url === '/' || req.url === '/index.html' || req.url === '/embed-example.html') {
    fs.readFile(path.join(__dirname, 'embed-example.html'), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}/`);
}); 