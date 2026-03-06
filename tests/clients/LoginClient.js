class LoginClient {
  constructor (request) {
    this.request = request;
  }

  async login (payload) {
    return await this.request.post ('/login', {
      data: {
        email: payload.email,
        password: payload.password,
      },
    });
  }
}

module.exports = LoginClient;
