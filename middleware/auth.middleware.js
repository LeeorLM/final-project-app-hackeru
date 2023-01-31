const jwt = require("../config/jwt");
const userModel = require("../models/user.model");
const CustomResponse = require("../classes/CustomResponse.class");

module.exports = async (req, res, next) => {
  try {
    let dataFromToken = await jwt.verifyToken(req.headers["x-auth-token"]);
    // console.log("dataFromToken", dataFromToken);
    let userData = await userModel.selectUserByEmail(dataFromToken.user_email);
    // console.log(req.userData);
    if (userData.length <= 0) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "invalid token");
    }
    req.userData = userData[0];
    next();
  } catch (err) {
    console.log("error from mw", err);
    res.status(401).json(err);
  }
};
