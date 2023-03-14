const Base = require('../base.js');
const fs = require('fs');
const fp = require('../../config/allFilePath.js');
const cp = require('child_process');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

module.exports = class extends Base {
  async getPicAction() {
    const _this = this;
    const sessionUserId = await this.post('SC_ID');
    const themefile = this.file('uploadFile');
    const count = Number(this.post('count')) + 1;
    // console.log('************************kkkkkkkkk/***' + themefile.type + '0000000000' + count + '***/kkkkkkkkkk****************************************************************************');
    console.log('success!');
    const sc = await this.model('users').where({ SC_ID: sessionUserId }).find();
    const pictureSavePath = fp.pictureDCopyPicture + sc.SC_TEL;
    if (!think.isExist(pictureSavePath)) {
      think.mkdir(pictureSavePath, '0777');
    }
    var promise = new Promise(function(resolve, reject) {
      fs.copyFile(themefile.path, pictureSavePath + '/' + count + '.jpg', function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return promise.then(function(data) {
      return _this.success({
        state: 1
      });
    }, function(err) {
      console.log('失败：' + err);
      return _this.success({
        state: 0
      });
    });
  };

  async computeSize2Action() {
    const _this = this;
    const sessionUserId = await this.post('SC_ID');
    const sc = await this.model('users').where({ SC_ID: sessionUserId }).find();
    const pictureSavePath = fp.pictureDCopyPicture + sc.SC_TEL;
    var s;
    var promise = new Promise(function(resolve, reject) {
      cp.exec('python E:/clothProject/sift8.1/result.py ' + pictureSavePath + '/ ' + 160, function(err, data) {
        if (err) {
          console.error('error: ' + err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return promise.then(function(s) {
      // then第一个函数是成功的回调，参数是resolve(data)中的data
      // console.log(decoder.write(s));
      var backLen = parseInt(decoder.write(s).split(/[\n]/)[0]); // 背长 SC_BAL
      var bustWidth = parseInt(decoder.write(s).split(/[\n]/)[1]); // 胸宽 SC_BUSTW
      var backWidth = parseInt(decoder.write(s).split(/[\n]/)[2]); // 背宽 SC_BW
      var bustCircle = parseInt(decoder.write(s).split(/[\n]/)[3]);
      var milkSpace = parseInt(decoder.write(s).split(/[\n]/)[4]);
      var waistCircle = parseInt(decoder.write(s).split(/[\n]/)[5]);
      var shoulderWidth = parseInt(decoder.write(s).split(/[\n]/)[6]);
      var underChest = parseInt(decoder.write(s).split(/[\n]/)[7]);
      var neckCircle = parseInt(decoder.write(s).split(/[\n]/)[8]);
      var armLen = parseInt(decoder.write(s).split(/[\n]/)[9]);
      var upperArm = parseInt(decoder.write(s).split(/[\n]/)[10]);
      var armCircle = parseInt(decoder.write(s).split(/[\n]/)[11]);
      var elbowCircle = parseInt(decoder.write(s).split(/[\n]/)[12]);
      var wristCircle = parseInt(decoder.write(s).split(/[\n]/)[13]);
      var sitHigh = parseInt(decoder.write(s).split(/[\n]/)[14]);
      var waistHigh = parseInt(decoder.write(s).split(/[\n]/)[15]);
      var hipHigh = parseInt(decoder.write(s).split(/[\n]/)[16]);
      var kneeLen = parseInt(decoder.write(s).split(/[\n]/)[17]);
      var hipCircle = parseInt(decoder.write(s).split(/[\n]/)[18]);
      var smallShoulder = parseInt(decoder.write(s).split(/[\n]/)[19]);
      var thighCircle = parseInt(decoder.write(s).split(/[\n]/)[20]);
      var kuaCircle = parseInt(decoder.write(s).split(/[\n]/)[21]);
      var calfCircle = parseInt(decoder.write(s).split(/[\n]/)[22]);
      var footCircle = parseInt(decoder.write(s).split(/[\n]/)[23]);
      var kneeCircle = parseInt(decoder.write(s).split(/[\n]/)[24]);
      var houlangchang = parseInt(decoder.write(s).split(/[\n]/)[25]);
      var qianlangchang = parseInt(decoder.write(s).split(/[\n]/)[26]);
      var xiadangchang = parseInt(decoder.write(s).split(/[\n]/)[27]);
      _this.model('body').where({ SC_ID_USERS: sessionUserId }).update({
        SC_HIP: hipCircle, // 臀围
        SC_WAIST: waistCircle, // 腰围
        SC_SW: shoulderWidth, // 肩宽
        SC_ARMC: armCircle, // 臂围
        SC_ARML: 50, // 臂长
        SC_THIGH: thighCircle, // 大腿根围
        SC_CG: calfCircle, // 小腿中围
        SC_WC: wristCircle, // 腕围
        SC_OL: waistHigh, // 裤长
        SC_BAL: backLen, // 背长
        SC_BUSTW: bustWidth, // 胸宽
        SC_BW: backWidth, // 背宽
        SC_BUST: bustCircle, // 胸围
        SC_BD: milkSpace, // 乳间距
        SC_LB: underChest, // 乳下围
        SC_NRC: neckCircle, // 颈根围
        SC_UAL: 25, // 上臂长
        SC_EC: elbowCircle, // 肘围
        SC_CH: sitHigh, // 坐姿颈椎点高
        SC_WH: waistHigh, // 腰围高也是裤长
        SC_HH: hipHigh, // 臀高
        SC_NL: kneeLen, // 膝长
        SC_SSW: 8, // 小肩宽
        SC_HG: kuaCircle, // 胯围
        SC_FNC: footCircle, // 足颈围
        SC_KC: kneeCircle, // 膝围
        SC_BRL: houlangchang, // 后浪长
        SC_FRL: qianlangchang, // 前浪长
        SC_SIGN: xiadangchang // 下裆长
      });
      return _this.success({
        SC_HIP: hipCircle, // 臀围
        SC_WAIST: waistCircle, // 腰围
        SC_SW: shoulderWidth, // 肩宽
        SC_ARMC: armCircle, // 臂围
        SC_ARML: 50, // 臂长
        SC_THIGH: thighCircle, // 大腿根围
        SC_CG: calfCircle, // 小腿中围
        SC_WC: wristCircle, // 腕围
        SC_OL: waistHigh, // 裤长
        SC_BAL: backLen, // 背长
        SC_BUSTW: bustWidth, // 胸宽
        SC_BW: backWidth, // 背宽
        SC_BUST: bustCircle, // 胸围
        SC_BD: milkSpace, // 乳间距
        SC_LB: underChest, // 乳下围
        SC_NRC: neckCircle, // 颈根围
        SC_UAL: 25, // 上臂长
        SC_EC: elbowCircle, // 肘围
        SC_CH: sitHigh, // 坐姿颈椎点高
        SC_WH: waistHigh, // 腰围高也是裤长
        SC_HH: hipHigh, // 臀高
        SC_NL: kneeLen, // 膝长
        SC_SSW: 8, // 小肩宽
        SC_HG: kuaCircle, // 胯围
        SC_FNC: footCircle, // 足颈围
        SC_KC: kneeCircle, // 膝围
        SC_BRL: houlangchang, // 后浪长
        SC_FRL: qianlangchang, // 前浪长
        SC_SIGN: xiadangchang // 下裆长
      });
    }, function(err) {
      // then第二个函数是失败的回调函数，参数是reject(err)中的err错误对象
      console.log('失败：' + err);
    });
  };

  async computeSizeAction() {
    const sessionUserId = await this.post('SC_ID');
    const sc = await this.model('users').where({ SC_ID: sessionUserId }).find();
    const pictureSavePath = fp.pictureDCopyPicture + sc.SC_TEL;
    const s = cp.execSync('python E:/clothProject/sift8.1/result.py ' + pictureSavePath + '/ ' + sc.SC_HEIGHT, {
      if(error) {
        console.error('error: ' + error);
        return null;
      }
    });
    console.log(decoder.write(s));
    var backLen = parseInt(decoder.write(s).split(/[\n]/)[0]); // 背长 SC_BAL
    var bustWidth = parseInt(decoder.write(s).split(/[\n]/)[1]); // 胸宽 SC_BUSTW
    var backWidth = parseInt(decoder.write(s).split(/[\n]/)[2]); // 背宽 SC_BW
    var bustCircle = parseInt(decoder.write(s).split(/[\n]/)[3]);
    var milkSpace = parseInt(decoder.write(s).split(/[\n]/)[4]);
    var waistCircle = parseInt(decoder.write(s).split(/[\n]/)[5]);
    var shoulderWidth = parseInt(decoder.write(s).split(/[\n]/)[6]);
    var underChest = parseInt(decoder.write(s).split(/[\n]/)[7]);
    var neckCircle = parseInt(decoder.write(s).split(/[\n]/)[8]);
    var armLen = parseInt(decoder.write(s).split(/[\n]/)[9]);
    var upperArm = parseInt(decoder.write(s).split(/[\n]/)[10]);
    var armCircle = parseInt(decoder.write(s).split(/[\n]/)[11]);
    var elbowCircle = parseInt(decoder.write(s).split(/[\n]/)[12]);
    var wristCircle = parseInt(decoder.write(s).split(/[\n]/)[13]);
    var sitHigh = parseInt(decoder.write(s).split(/[\n]/)[14]);
    var waistHigh = parseInt(decoder.write(s).split(/[\n]/)[15]);
    var hipHigh = parseInt(decoder.write(s).split(/[\n]/)[16]);
    var kneeLen = parseInt(decoder.write(s).split(/[\n]/)[17]);
    var hipCircle = parseInt(decoder.write(s).split(/[\n]/)[18]);
    var smallShoulder = parseInt(decoder.write(s).split(/[\n]/)[19]);
    var thighCircle = parseInt(decoder.write(s).split(/[\n]/)[20]);
    var kuaCircle = parseInt(decoder.write(s).split(/[\n]/)[21]);
    var calfCircle = parseInt(decoder.write(s).split(/[\n]/)[22]);
    var footCircle = parseInt(decoder.write(s).split(/[\n]/)[23]);
    var kneeCircle = parseInt(decoder.write(s).split(/[\n]/)[24]);
    var houlangchang = parseInt(decoder.write(s).split(/[\n]/)[25]);
    var qianlangchang = parseInt(decoder.write(s).split(/[\n]/)[26]);
    var xiadangchang = parseInt(decoder.write(s).split(/[\n]/)[27]);
    console.log(footCircle + '^^^^^^^^');
    await this.model('body').where({ SC_ID_USERS: sessionUserId }).update({
      SC_HIP: hipCircle, // 臀围
      SC_WAIST: waistCircle, // 腰围
      SC_SW: shoulderWidth, // 肩宽
      SC_ARMC: armCircle, // 臂围
      SC_ARML: armLen, // 臂长
      SC_THIGH: thighCircle, // 大腿根围
      SC_CG: calfCircle, // 小腿中围
      SC_WC: wristCircle, // 腕围
      SC_OL: waistHigh, // 裤长
      SC_BAL: backLen, // 背长
      SC_BUSTW: bustWidth, // 胸宽
      SC_BW: backWidth, // 背宽
      SC_BUST: bustCircle, // 胸围
      SC_BD: milkSpace, // 乳间距
      SC_LB: underChest, // 乳下围
      SC_NRC: neckCircle, // 颈根围
      SC_UAL: upperArm, // 上臂长
      SC_EC: elbowCircle, // 肘围
      SC_CH: sitHigh, // 坐姿颈椎点高
      SC_WH: waistHigh, // 腰围高也是裤长
      SC_HH: hipHigh, // 臀高
      SC_NL: kneeLen, // 膝长
      SC_SSW: smallShoulder, // 小肩宽
      SC_HG: kuaCircle, // 胯围
      SC_FNC: footCircle, // 足颈围
      SC_KC: kneeCircle, // 膝围
      SC_BRL: houlangchang, // 后浪长
      SC_FRL: qianlangchang, // 前浪长
      SC_SIGN: xiadangchang // 下裆长
    });
    return this.success({
      SC_HIP: hipCircle, // 臀围
      SC_WAIST: waistCircle, // 腰围
      SC_SW: shoulderWidth, // 肩宽
      SC_ARMC: armCircle, // 臂围
      SC_ARML: armLen, // 臂长
      SC_THIGH: thighCircle, // 大腿根围
      SC_CG: calfCircle, // 小腿中围
      SC_WC: wristCircle, // 腕围
      SC_OL: waistHigh, // 裤长
      SC_BAL: backLen, // 背长
      SC_BUSTW: bustWidth, // 胸宽
      SC_BW: backWidth, // 背宽
      SC_BUST: bustCircle, // 胸围
      SC_BD: milkSpace, // 乳间距
      SC_LB: underChest, // 乳下围
      SC_NRC: neckCircle, // 颈根围
      SC_UAL: upperArm, // 上臂长
      SC_EC: elbowCircle, // 肘围
      SC_CH: sitHigh, // 坐姿颈椎点高
      SC_WH: waistHigh, // 腰围高也是裤长
      SC_HH: hipHigh, // 臀高
      SC_NL: kneeLen, // 膝长
      SC_SSW: smallShoulder, // 小肩宽
      SC_HG: kuaCircle, // 胯围
      SC_FNC: footCircle, // 足颈围
      SC_KC: kneeCircle, // 膝围
      SC_BRL: houlangchang, // 后浪长
      SC_FRL: qianlangchang, // 前浪长
      SC_SIGN: xiadangchang // 下裆长
    });
  };

  sleep(ms) {
    ms += Math.random() * 2000;
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
};
