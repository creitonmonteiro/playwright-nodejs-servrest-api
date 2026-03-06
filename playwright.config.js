const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',

  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  fullyParallel: true,

  use: {
    baseURL: process.env.BASE_URL || 'https://serverest.dev',
  }
});