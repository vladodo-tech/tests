const { test, expect } = require("@playwright/test");
const { getProduct, getAllProducts } = require("../../services/product_services");
const { getDefaultProduct } = require("../../fixtures/productFixtures");
const { createTestProduct } = require("../../helpers/api");

test.describe("Product API — GET", () => {

  test("TC-P01 | Получение списка всех продуктов", async ({ request }) => {
    const productData = getDefaultProduct();
    await createTestProduct(request, productData);

    const res = await getAllProducts(request);

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test("TC-P02 | Получение продукта по валидному ID", async ({ request }) => {
    const productData = getDefaultProduct();
    const product = await createTestProduct(request, productData);

    const res = await getProduct(request, product.productId);

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(product.productId);
  });

  test("TC-P03 | Получение несуществующего продукта", async ({ request }) => {
    const res = await getProduct(request, 99999);

    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.message).toBe("Product with ID 99999 not found");
  });

  test("TC-P04 | Получение с невалидным ID", async ({ request }) => {
    const res = await request.get(`${process.env.API_URL}/product/abc`);

    expect(res.status()).toBe(400);
  });

  test("TC-P05 | Получение с ID = 0", async ({ request }) => {
    const res = await getProduct(request, 0);

    expect([400, 404]).toContain(res.status());
  });
});