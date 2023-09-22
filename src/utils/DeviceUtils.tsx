import type { Device } from '@controllers/types';

export const MAX_LAST_CHECK_DAYS = 30;

export const hasMissingSecurities = (device: Device): false | (keyof Device['security'])[] => {
  const thirtyDaysInMs = MAX_LAST_CHECK_DAYS * 24 * 60 * 60 * 1000;
  const timestampThirtyDaysAgo = new Date().getTime() - thirtyDaysInMs;

  if (timestampThirtyDaysAgo > device.lastCheckInDate) {
    return false;
  }

  const missingSecurities = Object.keys(device.security).filter(
    (key) => !device.security[key as keyof Device['security']]
  );

  return missingSecurities as (keyof Device['security'])[];
};
