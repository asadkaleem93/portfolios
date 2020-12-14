module.exports = {
  verifyUser: (user) => {
    const searchEmail = "SELECT * FROM user_info WHERE email = ${email}";
    return dbConnection
      .one(searchEmail, user)
      .then(async (res) => {
        const match = await bcrypt.compare(user.password, res.password);
        if (res.user_name === user.user_name && match) return res.user_name;
        else return "Credentials does not match the navigation user name";
      })
      .catch((err) => {
        console.log("err", err);
        return "Credentials Mis matched";
      });
  },
};
