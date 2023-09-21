import { getDevice } from '../controllers/devices';

import type { Router } from 'express';

const deviceRoutes = (router: Router) => {
  router.get('/devices/:id', getDevice);

  return router;
};

export default deviceRoutes;
