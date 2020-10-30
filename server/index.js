const fs = require('fs');
const path = require('path');
const express = require('express');
const template = fs.readFileSync(path.join(__dirname, '../src/index.html'), 'utf-8');

const server = (port) => {
  const app = express();

  // static target folder
  app.use(express.static('src'));
  app.use(express.static('asset'));

  // routers
  app.get('/', (req, res) => {
    const html = template;

    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log('Server is running on port: ' + port);
  });
};

server(process.env.PORT || 3000);