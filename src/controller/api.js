const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);
let cp = require('child_process');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

module.exports = class extends Base {
  testAction() {
    const h = this.get();
    console.log(h.a);
    this.body = {a: 'hi'};
  }

  async postPhotoAction() {
    const sessionUserId = await this.post('SC_ID');
    const user = await this.model('users').where({SC_ID: sessionUserId}).field('SC_NICKNAME').find();
    const size = await this.model('body').where({SC_ID_USERS: sessionUserId}).find();
    console.log(size)
    return this.success({
      user: user,
      size: size
    });
  }
};
