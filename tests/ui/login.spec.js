const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

const validUser = {
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD,
};

test.describe('Авторизация', () => {
  
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  
  test('TC-AUTH-001: Успешный вход с валидными данными', async () => {
    await loginPage.login(validUser.email, validUser.password);
    await loginPage.expectRedirectFromLogin();
  });


  test('TC-AUTH-003: Вход с неверным паролем', async () => {
    await loginPage.login(validUser.email, 'wrongpassword123');
    await loginPage.expectErrorVisible();
    await loginPage.expectStayOnLoginPage();
  });

  test('TC-AUTH-004: Вход с несуществующим email', async () => {
    await loginPage.login('nonexistent@example.com', validUser.password);
    await loginPage.expectErrorVisible();
    await loginPage.expectStayOnLoginPage();
  });

  test('TC-AUTH-005: Вход с пустыми полями', async () => {
    await loginPage.clickSubmit();
    await loginPage.expectStayOnLoginPage();
    await loginPage.expectFieldsVisible();
  });

  test('TC-AUTH-006: Вход с невалидным форматом email', async () => {
    await loginPage.login('invalid-email-format', validUser.password);
    await loginPage.expectStayOnLoginPage();
    await loginPage.expectEmailValue('invalid-email-format');
  });

});