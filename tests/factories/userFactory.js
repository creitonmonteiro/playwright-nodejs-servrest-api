import { faker } from '@faker-js/faker';

export function createUserPayload() {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'pwd123',
    administrador: 'true'
  };
}