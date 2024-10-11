const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const TOKEN = process.env.TOKEN_SECRET;
const BcryptData = {
  async PasswordHash(dataHash) {
    return await bcrypt.hash(dataHash, 12);
  },
  async CreateHashData(data, time = null) {
    Object.keys(data).forEach(function (key, index) {
      data[key] = jsonwebtoken.sign(data[key], TOKEN, time && {
        expiresIn: time,
      });
    });
    return data;
  },
  async VerifyDecodeData(data) {
    Object.keys(data).forEach(function (key, index) {
      if (typeof data[key] === "string" && data[key].length !== 0) {
        data[key] = jsonwebtoken.verify(data[key], TOKEN);
      }
      return data[key];
    });
    return data;
  },
  async BcryptCompare(data, dataDB) {
    const isMatch = await bcrypt.compareSync(data, dataDB);
    if (!isMatch) return { msg: "Password is incorrect!" };
  },
};

module.exports = BcryptData;
