import type { Device } from '@controllers/types';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { Table } from 'antd';
import axios from 'axios';

import './ComputerFleet.scss';
import { ComputerFleetPropTypes } from './ComputerFleet.types';
import type { ComputerFleetProps } from './ComputerFleet.types';

const ComputerFleet: FC<ComputerFleetProps> = ({ clientId }) => {
  const [devices, setDevices] = useState<Device[]>();

  useEffect(() => {
    axios.get<Device[]>(`http://localhost:8080/devices/${clientId}`).then((response) => setDevices(response.data));
  }, [clientId]);

  const dataSource = devices?.map((device) => ({
    key: device.id,
    serialNumber: device.serialNumber,
  }));

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
  ];

  return <Table className="computer-fleet" dataSource={dataSource} columns={columns} />;
};

ComputerFleet.displayName = 'ComputerFleet';

ComputerFleet.propTypes = ComputerFleetPropTypes;

export default ComputerFleet;
