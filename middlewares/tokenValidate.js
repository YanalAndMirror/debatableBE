const { verify } = require("jsonwebtoken");
const User = require("../models/User.model");

const tokenValidate = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (token) {
      const TokenData = verify(token, "SuperSecretKey");
      //req.user = await User.findById(TokenData._id);
      req.user = TokenData._id;
    }
    next();
  } catch {
    req.user = null;
    // Not Logged in user
    next();
  }
};
module.exports = tokenValidate;
