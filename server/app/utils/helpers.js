const bcrypt = require("bcrypt");

module.exports = {
  cryptPassword: function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return callback(err);

      bcrypt.hash(password, salt, function (err, hash) {
        return callback(err, hash);
      });
    });
  },
  comparePassword: function (plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
      return err == null ? callback(null, isPasswordMatch) : callback(err);
    });
  },
  findEmptyValues: (values, keys, apiResponse) => {
    const requiredFields = keys.reduce((acc, key) => {
      if (!values[key]) return [...acc, key];
      return acc;
    }, []);
    return requiredFields.join(", ");
  },
};
