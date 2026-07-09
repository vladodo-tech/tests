const { test, expect } = require("@playwright/test");
const {
  registerUser,
  loginUser,
} = require("../../services/auth_services");        
const {
  getDefaultUser,
} = require("../../fixtures/userFixtures");       
const { createUniqueUser } = require("../../helpers/api");  

test.describe("Auth API — Login", () => {
  
  test("TC-A01 | Вход с валидными данными", async ({ request }) => {
    const userData = getDefaultUser();
    const user = await createUniqueUser(request, userData);

    const res = await loginUser(request, user.email, userData.password);

    expect(res.status()).toBe(201);
  });

  test("TC-A02 | Вход с неверным паролем", async ({ request }) => {
    const userData = getDefaultUser();
    const user = await createUniqueUser(request, userData);

    const res = await loginUser(request, user.email, "wrongpassword");

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toBe("'Invalid email or password");
  });

  test("TC-A03 | Вход с несуществующим email", async ({ request }) => {
    const res = await loginUser(
      request,
      `nonexistent_${Date.now()}@test.com`,
      "password123"
    );

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toBe("'Invalid email or password");
  });

  test("TC-A04 | Вход без обязательных полей", async ({ request }) => {
  const res = await request.post(`${process.env.API_URL}/auth/login`, {
    data: {},
  });

  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(Array.isArray(body.message)).toBe(true);
  expect(body.message.length).toBeGreaterThan(0);
});

  test("TC-A05 | Вход с невалидным форматом email", async ({ request }) => {
    const res = await loginUser(request, "test", "password123");

    expect([400, 401]).toContain(res.status());
  });
});