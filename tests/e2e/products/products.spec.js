import {test, expect} from '@playwright/test';
import ProductsClient from '../../clients/ProductsClient';
import UsersClient from '../../clients/UsersClient';
import LoginClient from '../../clients/LoginClient';

import {createUserPayload} from '../../factories/userFactory';
import {createProductPayload} from '../../factories/productFactory';

test ('should create a new product successfully', async ({request}) => {
  const productClient = new ProductsClient (request);
  const usersClient = new UsersClient (request);
  const userLogin = new LoginClient (request);
  const newProduct = createProductPayload ();
  const newUser = createUserPayload ();
  let token;

  await test.step ('create a new user', async () => {
    const responseBody = await usersClient.createUser (newUser);
    expect (responseBody.status ()).toBe (201);
  });

  await test.step ('login with new user', async () => {
    const responseBody = await userLogin.login (newUser);
    expect (responseBody.status ()).toBe (200);

    const body = await responseBody.json ();
    token = body.authorization;
  });

  await test.step ('create a new product', async () => {
    const responseBody = await productClient.createProduct (newProduct, token);
    expect (responseBody.status ()).toBe (201);

    const body = await responseBody.json ();
    expect (body.message).toBe ('Cadastro realizado com sucesso');
  });
});
