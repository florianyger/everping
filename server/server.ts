import type { Express } from 'express';
import express from 'express';
import http from 'http';
import 'module-alias/register';

import routes from './routes/index';

const router: Express = express();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin,X-Requested-With,Content-Type,Accept,Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    return res.status(200).json({});
  }
  next();
});

router.use('/', routes);

/** Error handling */
router.use((_, res) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

// Start that server
const httpServer = http.createServer(router);
const PORT: string | number = process.env.PORT ?? 8080;
httpServer.listen(PORT, () => console.log(`API server alive and kicking on port ${PORT}`));
