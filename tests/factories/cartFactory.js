import {faker} from '@faker-js/faker';

export function createCartPayload (productId) {
  return {
    produtos: [
      {
        idProduto: productId,
        quantidade: faker.number.int ({min: 1, max: 5}),
      },
    ],
  };
}
