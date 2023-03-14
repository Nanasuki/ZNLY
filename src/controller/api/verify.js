const Base = require('../base.js');
const fs = require('fs');
const path = require('path');
let cp = require('child_process');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const rename = think.promisify(fs.rename, fs); // 通过 promisify 方法把 rename 方法包装成 Promise 接口

module.exports = class extends Base {
  // 发送短信验证码
  async smsAction() {
    const SMSClient = require('@alicloud/sms-sdk')

    // ACCESS_KEY_ID/ACCESS_KEY_SECRET
    const accessKeyId = 'LTAI4FxQnLVsMeXTrnrtDU35'
    const secretAccessKey = 'kv5tVuCsJycHlvszy61TsWe7YAFRjj'

    // 初始化sms_client
    let smsClient = new SMSClient({accessKeyId, secretAccessKey})


    let phoneNum = this.post('phoneNum')
    if (!phoneNum) {
      return this.fail(1003, '请输入手机号码');
    }

    // 生成短信验证码
    let smsCode = Math.floor(Math.random() * 999999 + 100000);
    this.cache(phoneNum, smsCode);

    console.log(`发送成功, 本次验证码为: ${smsCode}`);

    // 发送短信
    smsClient.sendSMS({
      PhoneNumbers: phoneNum,
      SignName: 'SmartCloth',
      TemplateCode: 'SMS_177544494',
      TemplateParam: JSON.stringify({
        'code': smsCode
      })
    }).then(function(res) {
      let {Code}= res
      if (Code === 'OK') {
        // 处理返回参数
        console.log(res);
      }
    }, function(err) {
      console.log(err);
    });

    return this.success({});
  }

  // 注册用户
  async registAction() {
    let phoneNum = this.post('phoneNum');
    let code = this.post('code');
    let password = this.post('password');

    // 获取缓存验证码
    let cacheCode = await this.cache(phoneNum);
    if (!cacheCode) {
      return this.fail(1001, '请先发送短信验证码');
    }

    if (code != cacheCode) {
      return this.fail(1002, '短信验证码输入有误');
    }
    // 新建用户
    // const adduser = await this.model('users').where({SC_NICKNAME: 'lbh'}).thenAdd({SC_NICKNAME: 'lbh', SC_TEL: phoneNum, SC_PASSWORD: password});
    const adduser = await this.model('users').where({SC_TEL: phoneNum}).thenAdd({
      SC_TEL: phoneNum,
      SC_PASSWORD: password
    });
    const addBody = await this.model('body').where({SC_ID_USERS: adduser.id}).thenAdd({SC_ID_USERS: adduser.id});
    return this.success({
      SC_ID: adduser.id
    });
  };
}
