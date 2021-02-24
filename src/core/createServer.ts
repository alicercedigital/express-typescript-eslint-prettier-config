import http from 'http';
import https from 'https';
import fs from 'fs';
import { Application } from 'express';
import { PRIVATE_KEY_PATH, PUBLIC_KEY_PATH, USE_SSL } from './envConstants';

const createServer = (app: Application) => {
  let server;
  if (USE_SSL === 'true') {
    server = https.createServer(
      {
        key: fs.readFileSync(PRIVATE_KEY_PATH),
        cert: fs.readFileSync(PUBLIC_KEY_PATH),
      },
      app
    );
  } else {
    server = http.createServer(app);
  }
  return server;
};

export default createServer;
