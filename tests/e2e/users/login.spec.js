import {test, expect} from '@playwright/test';
import UsersClient from '../../clients/UsersClient';
import LoginClient from '../../clients/LoginClient';
import {createUserPayload} from '../../factories/userFactory';

import userData from '../../fixtures/users.json';

test ('should login successfully', async ({request}) => {
  const usersClient = new UsersClient (request);
  const userLogin = new LoginClient (request);
  const newUser = createUserPayload ();

  await test.step ('create a new user', async () => {
    const response = await usersClient.createUser (newUser);
    expect (response.status ()).toBe (201);
  });

  await test.step ('login with new user', async () => {
    const responseBody = await userLogin.login (newUser);
    expect (responseBody.status ()).toBe (200);

    const body = await responseBody.json ();
    expect (body).toHaveProperty ('authorization');
    expect (body.authorization).toContain ('Bearer');
    expect (body.authorization).toMatch (/^Bearer\s.+/);
  });
});

test ('should login with invalid login', async ({request}) => {
  const userLogin = new LoginClient (request);

  const responseBody = await userLogin.login (userData.invalid);
  expect (responseBody.status ()).toBe (401);

  const body = await responseBody.json ();
  expect (body.message).toBe ('Email e/ou senha inválidos');
});
