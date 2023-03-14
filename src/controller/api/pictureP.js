const Base = require('../base.js');
const fs = require('fs');
const path = require('path');
let cp = require('child_process');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const rename = think.promisify(fs.rename, fs); // 通过 promisify 方法把 rename 方法包装成 Promise 接口
module.exports = class extends think.Controller {
  async getpicAction() {
    const s = cp.execSync('python E:/clothProject/sift8.1/result.py E:/wechatProjects/testPicture/key/', {
      if(error) {
        console.error('error: ' + error);
        return;
      }
    });
    console.log(decoder.write(s));
    console.log(decoder.write(s).split('#')[0]);
    console.log(decoder.write(s).split('#')[1]);
    console.log(decoder.write(s).split('#')[2]);
    console.log(decoder.write(s).split('#')[3]);
    // 将计算结果写入数据库
    // const adddata = await this.model('body').where({SC_NICKNAME: 'lbh'}).thenAdd({SC_NICKNAME: 'abc', SC_NRC: decoder.write(s).split('#')[0], SC_SW: decoder.write(s).split('#')[1], SC_ARMC: decoder.write(s).split('#')[2], SC_ARML: decoder.write(s).split('#')[3]});
    const updata = await this.model('body').where({SC_NICKNAME: 'lbh'}).update({SC_NICKNAME: 'lbh', SC_BAL: decoder.write(s).split('#')[0], SC_BUSTW: decoder.write(s).split('#')[1], SC_BW: decoder.write(s).split('#')[2], SC_BUST: decoder.write(s).split('#')[3]});
    return this.success({
      first: decoder.write(s).split('#')[0],
      second: decoder.write(s).split('#')[1],
      third: decoder.write(s).split('#')[2],
      fourth: decoder.write(s).split('#')[3]
    });
  }
}
