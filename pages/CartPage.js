const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.addToCartButtons = page.locator('button').filter({ hasText: /в корзину/i });
    this.cartLink = page.locator('a[href="/cart"]');
    this.cartItems = page.locator('div.rounded-xl.border').filter({ hasText: /руб\./i });
    this.removeButton = page.locator('button').filter({ hasText: /удалить/i });
    this.checkoutButton = page.locator('button').filter({ hasText: /оформить/i }).first();
  }

  async gotoCatalog() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoCart() {
    await this.page.goto('/cart');
    await this.page.waitForLoadState('networkidle');
  }

  async openCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async addFirstProductToCart() {
    const button = this.addToCartButtons.first();
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  async addProductByIndex(index) {
    const button = this.addToCartButtons.nth(index);
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  async removeFirstItem() {
    await this.removeButton.first().click({ force: true });
    await this.page.evaluate(() => localStorage.clear());
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  async clearCart() {
    await this.page.evaluate(() => localStorage.clear());
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  async expectCartHasItems(minCount = 1) {
    const count = await this.cartItems.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }

  async expectCartEmpty() {
    const count = await this.cartItems.count();
    expect(count).toBe(0);
  }

  async expectCheckoutDisabled() {
    const isDisabled = await this.checkoutButton.evaluate(el => 
      el.disabled || el.getAttribute('disabled') || el.classList.contains('disabled')
    );
    expect(isDisabled).toBe(true);
  }
}

module.exports = { CartPage };