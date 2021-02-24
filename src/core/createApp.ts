import express from 'express';
import crossOriginRequest from 'cors';
import setSecurityHttpHeaders from 'helmet';
import preventXssAttacks from 'xss-clean';
import apiErrorHandler from '../middlewares/apiErrorHandler';
import routes from '../routes';

const createApp = () => {
  const app = express();
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 }));
  app.use(crossOriginRequest({ optionsSuccessStatus: 200 }));
  app.use(setSecurityHttpHeaders());
  app.use(preventXssAttacks());
  app.use(express.static('public'));
  app.use('/', routes);
  app.use(apiErrorHandler);
  return app;
};

export default createApp;
