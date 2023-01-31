const CustomResponse = require("../classes/CustomResponse.class");

module.exports = (req, res, next) => {
  if (req.userData && req.userData.isAdmin) {
    next();
  } else {
    res.status(403).json(new CustomResponse(CustomResponse.STATUSES.fail, "you cant access this api"));
  }
};
