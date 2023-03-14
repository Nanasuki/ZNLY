const Base = require('../base.js');

module.exports = class extends Base {
  async inputAction(){
    const SC = 1;
    console.log("123456789");
    const message = this.post('SC_BUST,SC_HIP,SC_WAIST,SC_SW,SC_BW,SC_ARMC,SC_ARML,SC_THIGH,SC_CG,SC_WC,SC_OL');
    console.log("hh"+message);
    const bust = message.SC_BUST;
    const hip = message.SC_HIP;
    const waist = message.SC_WAIST;
    const sw = message.SC_SW;
    const bw = message.SC_BW;
    const armc = message.SC_ARMC;
    const arml = message.SC_ARML;
    const thigh = message.SC_THIGH;
    const cg = message.SC_CG;
    const wc = message.SC_WC;
    const ol = message.SC_OL;
    // console.log("胸围"+bust);
    // console.log("胸围"+hip);
    // console.log("胸围"+waist);
    // console.log("胸围"+sw);
    // console.log("胸围"+bw);
    // console.log("胸围"+armc);
    // console.log("胸围"+arml);
    // console.log("胸围"+thigh);
    // console.log("胸围"+cg);
    // console.log("胸围"+wc);
    // console.log("胸围"+ol);

    this.model('body').where({SC_ID:1}).update({SC_BUST: bust,SC_HIP: hip,SC_WAIST: waist,
      SC_SW: sw,SC_BW: bw,SC_ARMC: armc,SC_ARML: arml,SC_THIGH: thigh,SC_CG: cg,SC_WC: wc,SC_OL: ol});
  }

  async findAction(){
    const SC = 1;
    const size = await this.model('body').where({SC_ID:1}).find();
    const size_show = {SC_BUST: size.SC_BUST,SC_HIP: size.SC_HIP,SC_WAIST: size.SC_WAIST,
      SC_SW: size.SC_SW,SC_BW: size.SC_BW,SC_ARMC: size.SC_ARMC,SC_ARML: size.SC_ARML,SC_THIGH: size.SC_THIGH,SC_CG:size.SC_CG,SC_WC: size.SC_WC,SC_OL: size.SC_OL};
    console.log(size_show);
    return this.success(size_show);

  }



};