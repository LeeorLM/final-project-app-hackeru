const express = require("express");
const router = express.Router();
const logger = require("../../../../config/winston");
const userModel = require("../../../../models/user.model");
const authMiddelware = require("../../../../middleware/auth.middleware");
const isAdminMiddelware = require("../../../../middleware/isAdmin.middleware");
const CustomResponse = require("../../../../classes/CustomResponse.class");

router.get("/getallusers", authMiddelware, isAdminMiddelware, async (req, res) => {
  try {
    const users = await userModel.selectAllUsers();
    res.json(users);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

module.exports = router;
