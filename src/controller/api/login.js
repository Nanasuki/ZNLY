module.exports = class extends think.Controller {
  async loginAction() {
    const userObj = {
      SC_ID: null
    };
    const userPost = this.post('user');
    const userCheck = await this.model('users').where({SC_TEL: userPost.username, SC_PASSWORD: userPost.password}).find();
    userObj.SC_ID = userCheck.SC_ID;
    console.log(userObj.SC_ID);
    return this.success(userObj);
  }
};
