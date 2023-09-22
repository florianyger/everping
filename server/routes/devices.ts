import { getCustomerDevices } from '../controllers/devices';

import type { Router } from 'express';

const deviceRoutes = (router: Router) => {
  router.get('/devices/:id', getCustomerDevices);

  return router;
};

export default deviceRoutes;
