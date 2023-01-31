const express = require("express");
const router = express.Router();
const logger = require("../../../../config/winston");
const userModel = require("../../../../models/user.model");
const userValidation = require("../../../../validation/user.validation");
const bcrypt = require("../../../../config/bcrypt");
const crypto = require("../../../../config/crypto");
const sendEmail = require("../../../../config/mailer");
const generateRandomAlphaNumString = require("../../../../util/randomAlphaNum");
const CustomResponse = require("../../../../classes/CustomResponse.class");

// forgot Password
router.post("/forgetpassword", async (req, res) => {
  try {
    const validatedValue = await userValidation.validateForgetPasswordSchema(req.body);
    const usersData = await userModel.selectUserByEmail(validatedValue.user_email);
    if (usersData.length <= 0) {
      // throw { status: "failed", msg: "invalid email or password" };
      logger.error(`cant find this email:${validatedValue.user_email}`);
      throw new CustomResponse(CustomResponse.STATUSES.success, "if the email exists, the mail was sent");
    }
    const secretKey = generateRandomAlphaNumString(8);
    const encryptedData = crypto.encrypt(validatedValue.user_email);
    const urlSecretKey = `http://localhost:3000/user/recoverpassword/${secretKey}/${encryptedData.iv}/${encryptedData.encryptedData}`;
    const expDate = new Date(Date.now() + 1800000);
    await userModel.updateRecovery(validatedValue.user_email, secretKey, expDate);
    sendEmail({
      from: process.env.EMAIL_EMAIL,
      to: validatedValue.user_email,
      subject: "🦄your recovery email🦄",
      html: `
        <h1>your recovery link</h1>
        <a href="${urlSecretKey}">here</a>
      `,
    });
    logger.info(`mail sent to: ${validatedValue.user_email}`);
    res.json(new CustomResponse(CustomResponse.STATUSES.success, "if the email exists, the mail was sent"));
  } catch (err) {
    res.json(err);
  }
});

router.post("/recoverpassword/:secretKey/:iv/:encryptedData", async (req, res) => {
  try {
    const validatedValue = await userValidation.validateRecoveryPasswordSchema(req.body);
    /*
        get data from params
        decrypt the data from params
        if it success then we will get email
        else we will get ^&*%$&^%
      */
    const decryptedEmail = crypto.decrypt({
      iv: req.params.iv,
      encryptedData: req.params.encryptedData,
    });
    /*
        check if it success or fail
      */
    const validateEmail = await userValidation.validateRecoveryPasswordValidateEmailSchema({
      user_email: decryptedEmail,
    });
    const usersData = await userModel.selectUserByEmail(validateEmail.user_email);
    if (usersData.length <= 0) {
      // throw { status: "failed", msg: "invalid email or password" };
      logger.error(`email not exists, ${validatedValue.user_email}`);
      throw new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong");
    }
    if (usersData[0].recovery.secretKey !== req.params.secretKey) {
      logger.error(`user with email ${validatedValue.user_email} provied wrong key:${req.params.secretKey}`);
      throw new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong");
    }
    const nowDT = new Date();
    /*
        get the date and time now and convert it to number
        get the exp date from database and convert it to number
        if the number from the db smaller then now then the revocery expired
      */
    if (nowDT.getTime() > usersData[0].recovery.dateRecovery.getTime()) {
      logger.error(`${validatedValue.user_email} recovery key exipered`);
      throw new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong");
    }
    const hashedPassword = await bcrypt.createHash(validatedValue.user_password);
    await userModel.updatePassword(validateEmail.user_email, hashedPassword);
    res.json(new CustomResponse(CustomResponse.STATUSES.success, "password updated"));
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
