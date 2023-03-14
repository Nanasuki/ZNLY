const Base = require('../base.js');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const rename = think.promisify(fs.rename, fs); // 通过 promisify 方法把 rename 方法包装成 Promise 接口
module.exports = class extends think.Controller {
  async getpicAction() {
    const themefile = this.file('uploadFile');
    const count = this.post('count');
    const d = 10000;
    console.log('************************kkkkkkkkk/***' + themefile.type + '0000000000' + count + '***/kkkkkkkkkk****************************************************************************');
    console.log('success!');
    console.log('mmmmmmmmmmmmmmmmmmmm');
    fs.copyFileSync(themefile.path, 'E:/wechatProjects/testPicture/' + count + '.jpg');

    const s = cp.execSync('python E:/clothProject/photo_detection2/dia_compare.py E:/wechatProjects/testPicture/' + count + '.jpg ' + 'E:/wechatProjects/testPicture/key/', {
      if(error) {
        console.error('error: ' + error);
        return;
      }
    });
    // console.log(decoder.write(s));
    return this.success({
      isSuccess: decoder.write(s)
    });
  }
};
