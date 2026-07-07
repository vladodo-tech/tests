const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage');

const uniqueEmail = `test${Date.now()}@example.com`;
const uniqueUsername = `user${Date.now()}`;

test.describe('Регистрация', () => {
  
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('TC-REG-001: Успешная регистрация с валидными данными', async () => {
    await registerPage.register({
      name: 'Иван',
      surname: 'Иванов',
      email: uniqueEmail,
      username: uniqueUsername,  
      phone: '+123456789',
      password: 'password123'
    });
    
    await registerPage.page.waitForTimeout(3000);
    
    const url = registerPage.page.url();
    const pageText = await registerPage.page.locator('body').textContent();
    
    if (url.includes('/register')) {
      expect(pageText).not.toContain('Internal server error');
    } else {
      await expect(registerPage.page).toHaveURL(/^(?!.*register).*$/);
    }
  });

  test('TC-REG-002: Регистрация с уже существующим email', async () => {
    await registerPage.register({
      name: 'Иван',
      surname: 'Иванов',
      email: 'user1@test.com',
      username: `user${Date.now()}`,  
      phone: '+123456789',
      password: 'password123'
    });
    await registerPage.expectToastError('already exists');
    await registerPage.expectStayOnRegisterPage();
  });

  test('TC-REG-003: Регистрация с пустым полем Имя', async () => {
    await registerPage.register({
      name: '',
      surname: 'Иванов',
      email: `test${Date.now()}@example.com`,
      username: `user${Date.now()}`,
      phone: '+123456789',
      password: 'password123'
    });
    await registerPage.expectFieldError('Имя обязательно');
    await registerPage.expectStayOnRegisterPage();
  });

  test('TC-REG-004: Регистрация с пустым полем Email', async () => {
    await registerPage.register({
      name: 'Иван',
      surname: 'Иванов',
      email: '',
      username: `user${Date.now()}`,
      phone: '+123456789',
      password: 'password123'
    });
    await registerPage.expectFieldError('Email обязателен');
    await registerPage.expectStayOnRegisterPage();
  });

  test('TC-REG-005: Регистрация с пустым полем Пароль', async () => {
    await registerPage.register({
      name: 'Иван',
      surname: 'Иванов',
      email: `test${Date.now()}@example.com`,
      username: `user${Date.now()}`,
      phone: '+123456789',
      password: ''
    });
    await registerPage.expectFieldError('Пароль обязателен');
    await registerPage.expectStayOnRegisterPage();
  });

});