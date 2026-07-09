const BASE_URL = process.env.API_URL;

async function getBucket(request, userId) {
  return request.get(`${BASE_URL}/bucket/${userId}`);
}

async function addProductToBucket(request, userId, data) {
  return request.post(`${BASE_URL}/bucket/${userId}/addProduct`, { data });
}

async function removeProductFromBucket(request, userId, data) {
  return request.delete(`${BASE_URL}/bucket/${userId}/removeProduct`, { data });
}

module.exports = {
  getBucket,
  addProductToBucket,
  removeProductFromBucket,
};