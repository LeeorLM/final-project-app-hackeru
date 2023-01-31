const Joi = require("joi");

const firstNameRole = {
  first_name: Joi.string().min(2).max(255).required(),
};

const lastNameRole = {
  last_name: Joi.string().min(2).max(255).required(),
};
const userEmailRole = {
  user_email: Joi.string().email().min(6).max(255).trim().required(),
};

const userPasswordRole = {
  user_password: Joi.string().regex(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,12}$")).required(),
};

const likedMangaRole = {
  manga_name: Joi.string(),
  manga_id: Joi.string(),
  like: Joi.boolean(),
};

const likedBookRole = {
  book_name: Joi.string(),
  book_id: Joi.string(),
  like: Joi.boolean(),
};

const likedCharacterRole = {
  character_name: Joi.string(),
  character_id: Joi.string(),
  like: Joi.boolean(),
};

const userPhoneRole = {
  user_phone: Joi.string().min(7).max(255).trim(),
};

const userImageRole = {
  user_image: Joi.string().uri(),
};

const userNicknameRole = {
  user_nickname: Joi.string(),
};

const userAgeRole = {
  user_age: Joi.number(),
};

const userBirthdayRole = {
  user_birthday: Joi.string(),
};

const addNewUserSchema = Joi.object({
  ...firstNameRole,
  ...lastNameRole,
  ...userEmailRole,
  ...userPasswordRole,
  ...userPhoneRole,
  ...userImageRole,
});

const updateUserSchema = Joi.object({
  ...firstNameRole,
  ...lastNameRole,
  ...userEmailRole,
  ...userPhoneRole,
  ...userImageRole,
  ...userNicknameRole,
  ...userAgeRole,
  ...userBirthdayRole,
});

const loginSchema = Joi.object({
  ...userEmailRole,
  ...userPasswordRole,
});

const likedMangaSchema = Joi.object({
  ...likedMangaRole,
});

const likedBookSchema = Joi.object({
  ...likedBookRole,
});

const likedCharacterSchema = Joi.object({
  ...likedCharacterRole,
});

const forgetPasswordSchema = Joi.object({
  ...userEmailRole,
});
const recoveryPasswordSchema = Joi.object({
  ...userPasswordRole,
});
const recoveryPasswordValidateEmailSchema = Joi.object({
  ...userEmailRole,
});

const validateAddNewUserSchema = (data) => {
  return addNewUserSchema.validateAsync(data, { abortEarly: false });
};

const validatedLoginSchema = (data) => {
  return loginSchema.validateAsync(data, { abortEarly: false });
};

const validatedLikedMangaSchema = (data) => {
  return likedMangaSchema.validateAsync(data, { abortEarly: false });
};

const validatedLikedBookSchema = (data) => {
  return likedBookSchema.validateAsync(data, { abortEarly: false });
};

const validatedLikedCharacterSchema = (data) => {
  return likedCharacterSchema.validateAsync(data, { abortEarly: false });
};

const validateForgetPasswordSchema = (data) => {
  return forgetPasswordSchema.validateAsync(data, { abortEarly: false });
};

const validateRecoveryPasswordSchema = (data) => {
  return recoveryPasswordSchema.validateAsync(data, { abortEarly: false });
};

const validateRecoveryPasswordValidateEmailSchema = (data) => {
  return recoveryPasswordValidateEmailSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const validateUpdateUserInfo = (data) => {
  return updateUserSchema.validateAsync(data, {
    abortEarly: false,
  });
};

module.exports = {
  validateAddNewUserSchema,
  validatedLoginSchema,
  validatedLikedMangaSchema,
  validatedLikedBookSchema,
  validatedLikedCharacterSchema,
  validateForgetPasswordSchema,
  validateRecoveryPasswordSchema,
  validateRecoveryPasswordValidateEmailSchema,
  validateUpdateUserInfo,
};
