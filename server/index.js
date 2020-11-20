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

  // jsonp test
  app.get('/jsonp', (req, res) => {
    const jsonpObj = {
      name: 'jsonp',
      data: [1, 2, 3, 4, 5, 6]
    };

    res.status(200).jsonp(jsonpObj);
  });

  app.options('/cors', (req, res) => {
    console.log('preflight request');

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://192.168.43.103:5000');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.status(204).send();
  });

  // cors test - get request
  app.get('/cors', (req, res) => {
    const retObj = {
      name: 'cors-with-credentials',
      data: [6, 5, 4, 3, 2, 1]
    };

    // allow cors at server: http://192.168.43.103:5000/ ; http://192.168.199.155:5000
    res.header('Access-Control-Allow-Origin', 'http://192.168.43.103:5000');

    // allow other server send cookie to this server
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

    res.status(200).send(retObj);
  });

  // cors test - post request
  app.post('/cors', (req, res) => {
    // console.log('check params: ');
    // console.log(req.query.name);
    // console.log(req.query.password);

    const retObj = {
      name: 'cors-with-credentials',
      data: [6, 5, 4, 3, 2, 1]
    };

    // allow cors at server: http://192.168.199.155:5000
    res.header('Access-Control-Allow-Origin', 'http://192.168.43.103:5000');

    // allow other server send cookie to this server
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

    res.status(200)
       .cookie('authKey', 'hello world!', {
         expires: new Date(Date.now() + 900000),
         // httpOnly: true,
         path: '/',
         sameSite: 'None',
         // need https support to allow cross site cookie sharing
         secure: true
        })
       .send(retObj);
  });

  app.listen(port, () => {
    console.log('Server is running on port: ' + port);
  });
};

server(process.env.PORT || 3000);