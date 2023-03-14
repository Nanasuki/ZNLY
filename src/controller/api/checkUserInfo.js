const Base = require('../base.js');

module.exports = class extends Base {
  async checkAction() {
    const sessionScId = await this.post('SC_ID');
    const userInfo = await this.model('users').where({SC_ID: sessionScId}).find();
    // require : SC_GENDER SC_HEIGHT SC_WEIGHT SC_BURNDATE SC_CLOSIZE
    if (this.checkInfo(userInfo)) {
      return this.success({
        state: 1,
        modal: '信息完整!'
      });
    } else {
      return this.success({
        state: 0,
        modal: '请先补全信息!'
      });
    }
  }

  checkInfo(userInfo) {
    if (userInfo.SC_GENDER == null) {
      return false;
    } else if (userInfo.SC_HEIGHT == null) {
      return false;
    } else if (userInfo.SC_WEIGHT == null) {
      return false;
    } else if (userInfo.SC_BURNDATE == null) {
      return false;
    }
    // else if (userInfo.SC_CLOSIZE == null) {
    //   return false;
    // }
    else {
      return true;
    }
  }
};
