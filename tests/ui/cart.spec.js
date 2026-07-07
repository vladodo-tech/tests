const { test } = require('@playwright/test');
const { CartPage } = require('../../pages/CartPage');
const { LoginPage } = require('../../pages/LoginPage');

const validUser = {
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD,
};

test.describe('Корзина', () => {
  let cartPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.email, validUser.password);
    await loginPage.expectRedirectFromLogin();
  });

  test('TC-CART-003: Добавление товара в корзину из каталога', async () => {
    await cartPage.gotoCatalog();
    await cartPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.expectCartHasItems(1);
  });

  test('TC-CART-004: Удаление товара из корзины', async () => {
    await cartPage.gotoCatalog();
    await cartPage.addFirstProductToCart();
    await cartPage.gotoCart();
    await cartPage.expectCartHasItems(1);
    await cartPage.removeFirstItem();
    await cartPage.expectCartEmpty();
  });

  test('TC-CART-005: Добавление нескольких разных товаров', async () => {
    await cartPage.gotoCatalog();
    await cartPage.addFirstProductToCart();
    const buttonsCount = await cartPage.addToCartButtons.count();
    if (buttonsCount > 1) {
      await cartPage.addProductByIndex(1);
    }
    await cartPage.gotoCart();
    await cartPage.expectCartHasItems(1);
  });

  test('TC-CART-006: Открытие пустой корзины', async () => {
    await cartPage.clearCart();
    await cartPage.gotoCart();
    await cartPage.expectCartEmpty();
  });

  test('TC-CART-007: Очистка корзины', async () => {
    await cartPage.gotoCatalog();
    await cartPage.addFirstProductToCart();
    const buttonsCount = await cartPage.addToCartButtons.count();
    if (buttonsCount > 1) {
      await cartPage.addProductByIndex(1);
    }
    await cartPage.clearCart();
    await cartPage.gotoCart();
    await cartPage.expectCartEmpty();
  });
});