class CartsClient {
  constructor (request) {
    this.request = request;
  }

  async createProductCart (payload, token) {
    return await this.request.post ('/carrinhos', {
      data: payload,
      headers: {Authorization: token},
    });
  }
}

module.exports = CartsClient;