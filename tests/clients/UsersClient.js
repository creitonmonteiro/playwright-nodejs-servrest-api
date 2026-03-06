class UsersClient {
  constructor (request) {
    this.request = request;
  }

  async getUser (userId) {
    return await this.request.get (`/usuarios/${userId}`);
  }

  async listUsers () {
    return await this.request.get ('/usuarios');
  }

  async createUser (payload) {
    return await this.request.post ('/usuarios', {data: payload});
  }

  async deleteUser (userId) {
    return await this.request.delete (`/usuarios/${userId}`);
  }

  async updateUser (userId, payload) {
    return await this.request.put (`/usuarios/${userId}`, {data: payload});
  }
}

module.exports = UsersClient;
