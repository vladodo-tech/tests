const { registerUser } = require("../services/auth_services");
const { createProduct } = require("../services/product_services");

async function createUniqueUser(request, userData) {
  const res = await registerUser(request, userData);
  if (!res.ok()) {
    throw new Error(
      `createUniqueUser failed: ${res.status()} ${await res.text()}`,
    );
  }
  const body = await res.json();
  return { ...userData, userId: body.id ?? body.userId ?? body.user?.id };
}
async function createTestProduct(request, productData) {
  const res = await createProduct(request, productData);
  if (!res.ok()) {
    throw new Error(`createTestProduct failed: ${res.status()} ${await res.text()}`);
  }
  const body = await res.json();
  return { ...productData, productId: body.id ?? body.productId };
}

module.exports = {
  createUniqueUser,
  createTestProduct,
};
