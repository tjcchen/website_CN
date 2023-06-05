const http      = require('http');
const https     = require('https');
const path      = require('path');
const fs        = require('fs');
const httpPort  = 80;
const httpsPort = 443;
const template  = fs.readFileSync(path.join(__dirname, '../src/index.html'), 'utf-8');

let server = {};

// development cert config
server.httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '../https/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../https/cert.pem')),
};

// production cert config
// server.httpsOptions = {
//   key: fs.readFileSync('/ssl/cert.key', 'utf-8'),
//   cert: fs.readFileSync('/ssl/cert.pem', 'utf-8'),
//   ca: fs.readFileSync('/ssl/cert.cer', 'utf-8')
// };

server.httpServer = http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
});

server.httpsServer = https.createServer(server.httpsOptions, (req, res) => {
  server.universalServer(req, res);
});

server.universalServer = (req, res) => {
  const html = template;
  res.writeHead(200).end(html);
};

// http server
server.httpServer.listen(httpPort, function() {
  console.log(`The http server is listening on port ${httpPort}`);
});

// https server
server.httpsServer.listen(httpsPort, function() {
  console.log(`The https server is listening on port ${httpsPort}`);
});