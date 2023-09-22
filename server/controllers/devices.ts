import type { Device, DeviceList } from '@controllers/types';

import type { Request, Response } from 'express';
import fs from 'fs/promises';

const dataPath = 'data/devices.json';

export const getCustomerDevices = async (req: Request, res: Response) => {
  try {
    const deviceList: DeviceList = {
      clientIds: [],
      results: [],
      total: 0,
    };
    const deviceId = req.params.id;
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });

    if (data.length > 0) {
      const results: { devices: Device[] } = JSON.parse(data);
      deviceList.clientIds = [...new Set(results.devices.map((device) => device.clientId))];
      deviceList.results = [...results.devices.filter((deviceResult) => deviceResult.clientId === deviceId)];
      deviceList.total = deviceList.results.length;
      if (req.query.start && req.query.end) {
        deviceList.results = deviceList.results.slice(Number(req.query.start), Number(req.query.end));
      }
    }

    setTimeout(() => {
      res.status(200).send(deviceList);
    }, 10);
  } catch (error) {
    res.status(500).send(`An error occurred when fetching the device with id ${req.params.id}`);
  }
};

export default {
  getCustomerDevices,
};
