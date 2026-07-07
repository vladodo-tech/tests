const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('text=/неверный|invalid|ошибка|не найден|not found/i');
  }

  async goto() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  // Действия
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  async expectRedirectFromLogin() {
    await expect(this.page).toHaveURL(/^(?!.*login).*$/, { timeout: 10000 });
  }

  async expectStayOnLoginPage() {
    await expect(this.page).toHaveURL(/.*login/);
  }

  async expectErrorVisible() {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
  }

  async expectEmailValue(expectedValue) {
    await expect(this.emailInput).toHaveValue(expectedValue);
  }

  async expectFieldsVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }
}

module.exports = { LoginPage };