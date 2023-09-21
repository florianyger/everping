import express from 'express';

import devicesRoute from './devices';

const router = express.Router();

router.use('/devices', devicesRoute(router));

export default router;
