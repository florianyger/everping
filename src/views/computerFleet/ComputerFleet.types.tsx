import type { Device } from '@controllers/types';

import PropTypes from 'prop-types';

export type ComputerFleetProps = Pick<Device, 'clientId'>;

export const ComputerFleetPublicPropTypes = {
  clientId: PropTypes.string.isRequired,
};

export const ComputerFleetPropTypes = {
  ...ComputerFleetPublicPropTypes,
};
