const Joi = require("joi");

const characterNameRole = {
  character_name: Joi.string().min(2).required(),
};

const mangaNameRole = {
  manga_name: Joi.array().required(),
};

const characterRoleRole = {
  character_role: Joi.string().required(),
};

const characterBackgroundRole = {
  character_background: Joi.string().min(2),
};

const characterImageRole = {
  character_image: Joi.string().uri(),
};

const addNewCharacterSchema = Joi.object({
  ...characterNameRole,
  ...mangaNameRole,
  ...characterRoleRole,
  ...characterBackgroundRole,
  ...characterImageRole,
});

const updateCharacterSchema = Joi.object({
  ...characterNameRole,
  ...mangaNameRole,
  ...characterRoleRole,
  ...characterBackgroundRole,
  ...characterImageRole,
});

const validateAddNewCharacterSchema = (data) => {
  return addNewCharacterSchema.validateAsync(data, { abortEarly: false });
};

const validateUpdateCharacterSchema = (data) => {
  return updateCharacterSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateAddNewCharacterSchema,
  validateUpdateCharacterSchema,
};
