import createServer from './core/createServer';
import { NODE_ENV, PORT, USE_SSL } from './core/envConstants';
import ApiLogger from './core/ApiLogger';
import createApp from './core/createApp';

const app = createApp();
const server = createServer(app);

if (NODE_ENV !== 'test') {
  server.listen(PORT, () =>
    ApiLogger.log('info', {
      Mensagem: 'Servidor iniciado',
      Ambiente: NODE_ENV,
      Porta: PORT,
      SSL: USE_SSL,
    })
  );
}

export default app;
