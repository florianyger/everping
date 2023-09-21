import type { Device } from '@controllers/types';

import type { Request, Response } from 'express';
import fs from 'fs/promises';

const dataPath = 'data/devices.json';

export const getDevice = async (req: Request, res: Response) => {
  try {
    let device = {};
    const deviceId = req.params.id;
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });

    if (data.length > 0) {
      const results: { devices: Device[] } = JSON.parse(data);
      device = [...results.devices.filter((deviceResult) => deviceResult.clientId === deviceId)];
    }

    setTimeout(() => {
      res.status(200).send(device);
    }, 10);
  } catch (error) {
    res.status(500).send(`An error occurred when fetching the device with id ${req.params.id}`);
  }
};

export default {
  getDevice,
};
