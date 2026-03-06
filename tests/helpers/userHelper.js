import { expect } from '@playwright/test';

/**
 * Busca usuário por email
 */
async function getUserByEmail(usersClient, email) {
  const response = await usersClient.listUsers();
  const body = await response.json();
  return body.usuarios.find(u => u.email === email);
}

/**
 * Remove usuário caso exista
 */
async function deleteUserIfExists(usersClient, email) {
  const user = await getUserByEmail(usersClient, email);

  if (user) {
    const responseRemove = await usersClient.deleteUser(user._id);
    expect(responseRemove.status()).toBe(200);
  }
}

module.exports = { getUserByEmail, deleteUserIfExists };