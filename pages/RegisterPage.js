const { expect } = require('@playwright/test');

class RegisterPage {
  constructor(page) {
    this.page = page;

    this.nameInput = page.locator('input[name="firstname"]');
    this.surnameInput = page.locator('input[name="lastname"]');
    this.emailInput = page.locator('input[name="email"]');
    this.usernameInput = page.locator('input[name="username"]');
    this.phoneInput = page.locator('input[name="phoneNumber"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.toastError = page.locator('li[data-sonner-toast]');
    this.fieldError = page.locator('text=/обязательно|обязателен/i');
  }

  async goto() {
    await this.page.goto('/register');
    await this.page.waitForLoadState('networkidle');
  }

  async fillName(name) {
    await this.nameInput.click();
    await this.nameInput.fill(name);
  }

  async fillSurname(surname) {
    await this.surnameInput.click();
    await this.surnameInput.fill(surname);
  }

  async fillEmail(email) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async fillUsername(username) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  }

  async fillPhone(phone) {
    await this.phoneInput.click();
    await this.phoneInput.fill(phone);
  }

  async fillPassword(password) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async register(userData) {
    if (userData.name !== undefined) await this.fillName(userData.name);
    if (userData.surname !== undefined) await this.fillSurname(userData.surname);
    if (userData.email !== undefined) await this.fillEmail(userData.email);
    if (userData.username !== undefined) await this.fillUsername(userData.username);
    if (userData.phone !== undefined) await this.fillPhone(userData.phone);
    if (userData.password !== undefined) await this.fillPassword(userData.password);
    await this.clickSubmit();
  }

  async expectRedirectToHome() {
    await expect(this.page).toHaveURL(/^(?!.*register).*$/, { timeout: 10000 });
  }

  async expectStayOnRegisterPage() {
    await expect(this.page).toHaveURL(/.*register/);
  }

  async expectToastError(text) {
    await expect(this.toastError).toContainText(text, { timeout: 5000 });
  }

  async expectFieldError(text) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible({ timeout: 5000 });
  }
}

module.exports = { RegisterPage };