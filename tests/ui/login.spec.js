const { test, expect } = require('@playwright/test');

const validUser = {
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD,
};

test.describe('Авторизация', () => {
  
  
  test('TC-AUTH-001: Успешный вход с валидными данными', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await page.locator('input[name="email"]').fill(validUser.email);
    await page.locator('input[type="password"]').fill(validUser.password);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/^(?!.*login).*$/, { timeout: 10000 });
  });


  test('TC-AUTH-003: Вход с неверным паролем', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await page.locator('input[name="email"]').fill(validUser.email);
    await page.locator('input[type="password"]').fill('wrongpassword123');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('text=/неверный|invalid|ошибка/i')).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC-AUTH-004: Вход с несуществующим email', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await page.locator('input[name="email"]').fill('nonexistent@example.com');
    await page.locator('input[type="password"]').fill(validUser.password);
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('text=/неверный|invalid|не найден|not found/i')).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC-AUTH-005: Вход с пустыми полями', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/.*login/);

    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('TC-AUTH-006: Вход с невалидным форматом email', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await page.locator('input[name="email"]').fill('invalid-email-format');
    await page.locator('input[type="password"]').fill(validUser.password);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/.*login/);

    await expect(page.locator('input[name="email"]')).toHaveValue('invalid-email-format');
  });

});