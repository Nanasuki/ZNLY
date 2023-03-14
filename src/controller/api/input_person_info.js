function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('../base.js');

module.exports = class extends Base {
  async inputAction() {
    var _this = this;

    return _asyncToGenerator(function * () {
      // const SC = 1;
      // const message = _this.post('SC_GENDER, SC_BURNDATE, SC_HEIGHT, SC_WEIGHT,SC_CLOSIZE');
      const message = _this.post('info_obj');
      const SC = _this.post('SC_ID');
      const gender = message.SC_GENDER;
      const date = message.SC_BURNDATE;
      const height = message.SC_HEIGHT;
      const weight = message.SC_WEIGHT;
      const size = message.SC_CLOSIZE;

      _this.model('users').where({ SC_ID: SC }).update({ SC_GENDER: gender, SC_BURNDATE: date, SC_HEIGHT: height, SC_WEIGHT: weight, SC_CLOSIZE: size });
    })();
  }

  async findAction() {
    var _this2 = this;
    const sessionUserId = await this.post('SC_ID');

    return _asyncToGenerator(function * () {
      const info = yield _this2.model('users').where({ SC_ID: sessionUserId }).find();
      const info_show = { SC_GENDER: info.SC_GENDER, SC_BURNDATE: info.SC_BURNDATE, SC_HEIGHT: info.SC_HEIGHT, SC_WEIGHT: info.SC_WEIGHT, SC_CLOSIZE: info.SC_CLOSIZE };
      console.log(info_show);
      return _this2.success(info_show);
    })();
  }

};
//# sourceMappingURL=input_person_info.js.map
