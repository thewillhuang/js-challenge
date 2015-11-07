'use strict';

const koa = require('koa');
const app = module.exports = koa();
const port = process.env.PORT || 3000;
const logger = require('koa-logger');
const path = require('path');
const build = '/public';
const buildPath = path.join(__dirname, build);
const etag = require('koa-etag');
const conditional = require('koa-conditional-get');
const helmet = require('koa-helmet');
const staticCache = require('koa-static-cache');
const serve = require('koa-static');
const send = require('koa-send');


// cacheing
app.use(conditional());
app.use(etag());

// proxy
app.proxy = true;

// security headers
app.use(helmet());

// static file server
if (process.env.NODE_ENV === 'development') {
  console.log('server running in development mode');

  // logging
  app.use(logger());

  // serve fresh files
  app.use(serve(buildPath));
} else {
  console.log('server running in production mode');
  // serve cached files for faster speed
  app.use(staticCache(buildPath, {
    buffer: true,
    usePrecompiledGzip: true,
    gzip: true,
    dynamic: true,
  }));
}

app.use(function* skipToSocketIo(next) {
  if (this.path.indexOf('socket.io') !== -1) {
    yield next;
  }

  yield send(this, buildPath + '/index.html');
});

// socket io for real time updates
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
io.on('connection', function(socket) {
  socket.on('update', function(data) {
    io.sockets.emit('updated', data);
  });
});

// start http server
server.listen(port);
console.log('http listening on port:', port);
