module.exports = {
  getDefaultUser() {
    const suffix = Date.now();
    return {
      firstname: "Test",
      lastname: "User",
      phoneNumber: "+12345678901",
      email: `testuser_${suffix}@test.com`,
      username: `testuser_${suffix}`,
      password: "password123",
      role: "USER",
    };
  },

  getCustomUser(firstname, lastname) {
    const suffix = Date.now();
    return {
      firstname: firstname,
      lastname: lastname,
      phoneNumber: "+12345678901",
      email: `${firstname.toLowerCase()}_${suffix}@test.com`,
      username: `${firstname.toLowerCase()}_${suffix}`,
      password: "password123",
      role: "USER",
    };
  },

  getAdminUser() {
    const suffix = Date.now();
    return {
      firstname: "Admin",
      lastname: "User",
      phoneNumber: "+12345678901",
      email: `admin_${suffix}@test.com`,
      username: `admin_${suffix}`,
      password: "password123",
      role: "ADMIN",
    };
  },
};