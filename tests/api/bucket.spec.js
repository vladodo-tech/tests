const { test, expect } = require("@playwright/test");
const {
  getBucket,
  addProductToBucket,
  removeProductFromBucket,
} = require("../../services/bucket_services");
const { getDefaultUser } = require("../../fixtures/userFixtures");
const { getDefaultProduct } = require("../../fixtures/productFixtures");
const { createUniqueUser, createTestProduct } = require("../../helpers/api");

test.describe("Bucket API", () => {

  test("TC-B01 | Получение корзины пользователя", async ({ request }) => {
    const userData = getDefaultUser();
    const user = await createUniqueUser(request, userData);

    const res = await getBucket(request, user.userId);

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("products");
  });

  test("TC-B02 | Получение корзины несуществующего пользователя", async ({ request }) => {
    const res = await getBucket(request, 99999);

    expect([200, 404]).toContain(res.status());
  });

  test("TC-B03 | Добавление продукта в корзину", async ({ request }) => {
    const userData = getDefaultUser();
    const user = await createUniqueUser(request, userData);
    const productData = getDefaultProduct();
    const product = await createTestProduct(request, productData);

    const res = await addProductToBucket(request, user.userId, {
      productId: product.productId,
    });

    expect(res.status()).toBe(201);
  });

  test("TC-B04 | Добавление продукта несуществующему пользователю", async ({ request }) => {
    const res = await addProductToBucket(request, 99999, {
      productId: 1,
    });

    expect([404, 400]).toContain(res.status());
    if (res.status() !== 204) {
      const body = await res.json();
      const msg = Array.isArray(body.message) ? body.message.join(", ") : body.message;
      expect(msg).toMatch(/User or product not found|not found/);
    }
  });

  test("TC-B05 | Удаление продукта из корзины", async ({ request }) => {
    const userData = getDefaultUser();
    const user = await createUniqueUser(request, userData);
    const productData = getDefaultProduct();
    const product = await createTestProduct(request, productData);

    const addRes = await addProductToBucket(request, user.userId, {
      productId: product.productId,
    });
    expect(addRes.status()).toBe(201);

    const res = await removeProductFromBucket(request, user.userId, {
      productId: product.productId,
    });

    expect(res.status()).toBe(200);
  });
});