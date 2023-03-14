const Base = require('./base.js');

module.exports = class extends Base {
  testAction() {
    for(var i = 0; i < 100; i++){
      const a = Math.random() * 2 - 1;  // [-1,1)
      console.log(a);
    }
  }
};
