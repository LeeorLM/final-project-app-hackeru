const express = require("express");
const router = express.Router();
const logger = require("../../../config/winston");
const userModel = require("../../../models/user.model");
const userValidation = require("../../../validation/user.validation");
const bcrypt = require("../../../config/bcrypt");
const jwt = require("../../../config/jwt");
const crypto = require("../../../config/crypto");
const sendEmail = require("../../../config/mailer");
const generateRandomAlphaNumString = require("../../../util/randomAlphaNum");
const CustomResponse = require("../../../classes/CustomResponse.class");
const adminRouter = require("./routes/userAdmin.router");
const likeRouter = require("./routes/userLike.router");
const forgotRecoverPasswordRouter = require("./routes/forgot_recover.router");

// need to do that only admins can get all the users
router.use("/admin", adminRouter);
router.use("/like", likeRouter);
router.use("", forgotRecoverPasswordRouter);

router.post("/register", async (req, res) => {
  try {
    const validatedValue = await userValidation.validateAddNewUserSchema(req.body);
    console.log("validatedValue", validatedValue);
    const userData = await userModel.selectUserByEmail(validatedValue.user_email);
    if (userData.length > 0) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "email already exist");
    }
    const hashedPassword = await bcrypt.createHash(validatedValue.user_password);
    const newUserData = await userModel.insertUser(
      validatedValue.first_name,
      validatedValue.last_name,
      validatedValue.user_email,
      hashedPassword,
      validatedValue.user_phone,
      validatedValue.user_image
    );
    res.json(new CustomResponse(CustomResponse.STATUSES.success, "user successfuly created", newUserData));
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.post("/login", async (req, res) => {
  try {
    const validatedValue = await userValidation.validatedLoginSchema(req.body);
    const userData = await userModel.selectUserByEmail(validatedValue.user_email);
    console.log("userData", userData);
    if (userData.length <= 0) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "invalid email and/or password");
    }
    const hashRes = await bcrypt.cmpHash(validatedValue.user_password, userData[0].user_password);
    if (!hashRes) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "invalid email and/or password");
    }
    let token = await jwt.generateToken({
      user_id: userData[0]._id,
      user_email: userData[0].user_email,
      isAdmin: userData[0].isAdmin,
      first_name: userData[0].first_name,
    });
    res.json(new CustomResponse(CustomResponse.STATUSES.success, "here your token", token));
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.get("/my/:id", async (req, res) => {
  try {
    const user = await userModel.selectUserById(req.params.id);
    if (!user) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "user not found");
    }
    res.json(user);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});
router.get("/my2/:id", async (req, res) => {
  try {
    const user = await userModel.selectUserById2(req.params.id);
    if (!user) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "user not found");
    }
    res.json(user);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log("body", req.body);
    const { error } = await userValidation.validateUpdateUserInfo(req.body);
    if (error) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "somethin went wrong on validation", error.details[0].message);
    }
    const user = await userModel.updateUserInfo(req.params.id, req.body);
    if (!user) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "user not found");
    }
    res.send(user);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

module.exports = router;
