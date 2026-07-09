module.exports = {
  getDefaultProduct() {
    const suffix = Date.now();
    return {
      name: `Test Product ${suffix}`,
      description: "Test description",
      price: 100,
      category: "ELECTRONICS",
      urlImage: "https://example.com/images/test.png",
    };
  },

  getProductWithCategory(category) {
    const suffix = Date.now();
    return {
      name: `Test Product ${suffix}`,
      description: "Test description",
      price: 100,
      category: category,
      urlImage: "https://example.com/images/test.png",
    };
  },
};