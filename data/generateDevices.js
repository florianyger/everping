import { faker } from '@faker-js/faker';
import fs from 'fs';

const clientIds = Array.from({ length: 10 }, faker.person.lastName)

const generateDevice = () => {
  return {
    id: faker.string.uuid(),
    clientId: faker.helpers.arrayElement(clientIds),
    manufacturer: faker.company.name(),
    model: faker.string.alphanumeric(4),
    serialNumber: faker.string.alphanumeric(12),
    cpu: faker.word.words(5),
    ram: faker.helpers.arrayElement([2, 4, 8, 16, 32, 64]),
    storage: faker.helpers.arrayElement([64, 128, 256, 512, 1024, 2048, 4096]),
    hardwareId: faker.string.uuid(),
    security : {
      firewall: faker.datatype.boolean(),
      antivirus: faker.datatype.boolean(),
      encryption: faker.datatype.boolean(),
    },
    user: faker.internet.email(),
    lastCheckInDate: faker.date.recent({ days: 45 }).getTime()
  };
};

const generateDevices = (count) => {
  return {devices: Array.from({ length: count }, generateDevice)};
};

let dataObj = generateDevices(100);
fs.writeFileSync('data/devices.json', JSON.stringify(dataObj, null, '\t'));
