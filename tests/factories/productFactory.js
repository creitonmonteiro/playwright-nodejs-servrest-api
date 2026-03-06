import {faker} from '@faker-js/faker';

export function createProductPayload () {
  return {
    nome: faker.commerce.productName (),
    preco: faker.number.int ({min: 100, max: 500}),
    descricao: faker.commerce.productDescription (),
    quantidade: faker.number.int ({min: 10, max: 500}),
  };
}
