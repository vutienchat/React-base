import { faker } from '@faker-js/faker';
import { Employee } from './types';

export const generateEmployee = (): Employee => {
  return {
    id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    prefix: faker.name.prefix(),
    jobTitle: faker.name.jobTitle(),
    sex: faker.name.sexType(),
    status: faker.datatype.number({ min: 1, max: 2 }),
  };
};
