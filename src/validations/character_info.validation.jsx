import Joi from "joi-browser";

const addNewCharacterSchema = {
  character_name: Joi.string().min(2).required(),
  manga_name: Joi.array().required(),
  character_role: Joi.string().required(),
  character_background: Joi.string().min(2),
  character_image: Joi.string().uri(),
};

export default addNewCharacterSchema;
