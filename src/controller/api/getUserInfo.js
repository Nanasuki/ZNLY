const Base = require('../base.js');

module.exports = class extends Base {
  async getUserAction() {
    const sessionUserId = await this.post('SC_ID');
    const userInfo = await this.model('users').where({SC_ID: sessionUserId}).find();
    const age = userInfo.SC_BURNDATE;
    userInfo.SC_PASSWORD = 0;
    userInfo.SC_TEL = 0;
    return this.success(userInfo);
  }
};
