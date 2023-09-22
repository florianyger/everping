import type { Device } from '@controllers/types';

import { describe, expect, it } from 'vitest';

import { MAX_LAST_CHECK_DAYS, hasMissingSecurities } from './DeviceUtils';

const fakeDevice: Device = {
  clientId: '',
  cpu: '',
  hardwareId: '',
  id: '',
  lastCheckInDate: 0,
  manufacturer: '',
  model: '',
  ram: 0,
  security: { antivirus: false, encryption: false, firewall: false },
  serialNumber: '',
  storage: 0,
  user: '',
};

describe('DeviceUtils', (): void => {
  describe('hasMissingSecurities', (): void => {
    it('Last check too old', (): void => {
      const d = new Date();
      d.setDate(d.getDate() - (MAX_LAST_CHECK_DAYS + 1));

      fakeDevice.lastCheckInDate = d.getTime();
      expect(hasMissingSecurities(fakeDevice)).toBeFalsy();

      d.setDate(d.getDate() + 2);

      fakeDevice.lastCheckInDate = d.getTime();
      expect(hasMissingSecurities(fakeDevice)).toBeTruthy();
    });

    it('All is off', (): void => {
      expect(hasMissingSecurities(fakeDevice)).toEqual(['antivirus', 'encryption', 'firewall']);
    });

    it('Some are on', (): void => {
      fakeDevice.security.antivirus = true;
      expect(hasMissingSecurities(fakeDevice)).toEqual(['encryption', 'firewall']);

      fakeDevice.security.firewall = true;
      expect(hasMissingSecurities(fakeDevice)).toEqual(['encryption']);
    });

    it('All good !', (): void => {
      fakeDevice.security.encryption = true;
      expect(hasMissingSecurities(fakeDevice)).toEqual([]);
    });
  });
});
