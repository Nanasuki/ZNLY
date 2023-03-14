module.exports = class extends think.Model {
  async getUser() {
    return this.field('SC_ID').select();
  }
};
