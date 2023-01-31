import Joi from "joi-browser";

const forgotPasswordSchema = {
  user_email: Joi.string().email().min(6).max(255).trim().required(),
};

export default forgotPasswordSchema;
