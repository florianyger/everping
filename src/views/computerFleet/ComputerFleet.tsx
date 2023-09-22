import type { Device, DeviceList } from '@controllers/types';
import { Icon } from '@iconify/react';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { Select, Table } from 'antd';
import { DEFAULT_PAGE_SIZE } from 'antd/lib/table/hooks/usePagination';
import axios from 'axios';

import { ComputerFleetPropTypes } from './ComputerFleet.types';
import type { ComputerFleetProps } from './ComputerFleet.types';
import { hasMissingSecurities } from '@/utils/DeviceUtils';

const ComputerFleet: FC<ComputerFleetProps> = ({ clientId }) => {
  const [devices, setDevices] = useState<Device[]>();
  const [currentClientId, setCurrentClientId] = useState<Device['clientId']>(clientId);
  const [clientIds, setClientIds] = useState<Device['clientId'][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    axios
      .get<DeviceList>(
        `http://localhost:8080/devices/${currentClientId}?start=${(currentPage - 1) * DEFAULT_PAGE_SIZE}&end=${
          currentPage * DEFAULT_PAGE_SIZE
        }`
      )
      .then((response) => {
        setClientIds(response.data.clientIds);
        setDevices(response.data.results);
        setTotal(response.data.total);
      });
  }, [currentPage, currentClientId]);

  const dataSource = devices?.map((device) => ({
    key: device.id,
    serialNumber: device.serialNumber,
    securityStatus: hasMissingSecurities(device),
  }));

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Security Status',
      dataIndex: 'securityStatus',
      key: 'securityStatus',
      render: (value: false | (keyof Device['security'])[]) => {
        if (!Array.isArray(value) && !value) {
          return <Icon color="grey" icon="mdi:clock" />;
        }

        if (value.length === 0) {
          return <Icon color="green" icon="mdi:shield-check" />;
        }

        return value.map((key) => {
          if (key === 'firewall') {
            return <Icon key="firewall" color="red" icon="mdi:wall" />;
          }

          if (key === 'antivirus') {
            return <Icon key="antivirus" color="red" icon="mdi:antivirus" />;
          }

          return <Icon key="lock" color="red" icon="mdi:lock-off" />;
        });
      },
    },
  ];

  const healthyDevicesCount = dataSource
    ? dataSource.filter((data) => Array.isArray(data.securityStatus) && data.securityStatus.length === 0).length
    : 0;

  return (
    <div>
      <Select
        value={currentClientId}
        onSelect={(value) => {
          setCurrentClientId(value);
          setCurrentPage(1);
        }}
        options={clientIds.map((id) => ({
          value: id,
          label: id,
        }))}
      />
      <Table
        className="computer-fleet"
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total,
          current: currentPage,
          onChange: (current) => setCurrentPage(current || 1),
          showTotal: (_total, range) => `${range[0]}-${range[1]} of ${_total} items`,
        }}
        title={() => `${100 * (healthyDevicesCount / (dataSource?.length || 0))}% healthy devices`}
      />
    </div>
  );
};

ComputerFleet.displayName = 'ComputerFleet';

ComputerFleet.propTypes = ComputerFleetPropTypes;

export default ComputerFleet;
