import {test, expect} from '@playwright/test';
import UsersClient from '../../clients/UsersClient';
import {deleteUserIfExists} from '../../helpers/userHelper';
import {createUserPayload} from '../../factories/userFactory';

import userData from '../../fixtures/users.json';

test ('should create a new user successfully', async ({request}) => {
  const usersClient = new UsersClient (request);
  const newUser = createUserPayload ();

  const response = await usersClient.createUser (newUser);
  expect (response.status ()).toBe (201);

  const responseBody = await response.json ();
  expect (responseBody.message).toBe ('Cadastro realizado com sucesso');
});

test ('should update user successfully', async ({request}) => {
  const usersClient = new UsersClient (request);
  let userToUpdate = createUserPayload ();
  let userId;

  await test.step ('create a new user', async () => {
    const response = await usersClient.createUser (userToUpdate);
    expect (response.status ()).toBe (201);

    const responseBody = await response.json ();
    userId = responseBody._id;
  });

  await test.step ('update user', async () => {
    const response = await usersClient.updateUser (userId, userToUpdate);
    expect (response.status ()).toBe (200);

    const responseBody = await response.json ();
    expect (responseBody.message).toBe ('Registro alterado com sucesso');
  });
});

test ('should delete user successfully', async ({request}) => {
  const usersClient = new UsersClient (request);
  let userToUpdate = createUserPayload ();
  let userId;

  await test.step ('create a new user', async () => {
    const response = await usersClient.createUser (userToUpdate);
    expect (response.status ()).toBe (201);

    const responseBody = await response.json ();
    userId = responseBody._id;
  });

  await test.step ('delete user', async () => {
    const response = await usersClient.deleteUser (userId);
    expect (response.status ()).toBe (200);

    const responseBody = await response.json ();
    expect (responseBody.message).toBe ('Registro excluído com sucesso');
  });
});

test ('should search a user by valid id', async ({request}) => {
  const usersClient = new UsersClient (request);
  const searchUser = createUserPayload ();
  let userId;

  await test.step ('create a new user', async () => {
    const response = await usersClient.createUser (searchUser);
    expect (response.status ()).toBe (201);

    const responseBody = await response.json ();
    userId = responseBody._id;
  });

  await test.step ('search user', async () => {
    const response = await usersClient.getUser (userId);
    expect (response.status ()).toBe (200);

    const responseBody = await response.json ();
    expect (responseBody.nome).toBe (searchUser.nome);
    expect (responseBody.email).toBe (searchUser.email);
    expect (responseBody._id).toBe (userId);
  });
});

test ('should create a new user with a duplicate email', async ({request}) => {
  const usersClient = new UsersClient (request);
  const user = userData.duplicate;

  await test.step ('cleanup existing user', async () => {
    await deleteUserIfExists (usersClient, user.email);
  });

  await test.step ('create a new user', async () => {
    const response = await usersClient.createUser (user);
    expect (response.status ()).toBe (201);
  });

  await test.step ('duplicate user', async () => {
    const responseDuplicate = await usersClient.createUser (user);
    expect (responseDuplicate.status ()).toBe (400);

    const body = await responseDuplicate.json ();
    expect (body.message).toBe ('Este email já está sendo usado');
  });
});

test ('should delete user invalid id', async ({request}) => {
  const usersClient = new UsersClient (request);

  const response = await usersClient.deleteUser ('0pxpPY0axmQhpYz1');
  expect (response.status ()).toBe (200);

  const responseBody = await response.json ();
  expect (responseBody.message).toBe ('Nenhum registro excluído');
});

test ('should search a user by invalid id', async ({request}) => {
  const usersClient = new UsersClient (request);
  const response = await usersClient.getUser ('0pxpPY0cbmQhpYz1');
  expect (response.status ()).toBe (400);

  const responseBody = await response.json ();
  expect (responseBody.message).toBe ('Usuário não encontrado');
});
