class ProductsClient {
  constructor (request) {
    this.request = request;
  }

  async createProduct (payload, token) {
    return await this.request.post ('/produtos', {
      data: payload,
      headers: {Authorization: token},
    });
  }
}

module.exports = ProductsClient;
