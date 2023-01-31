import Joi from "joi-browser";

const userLoginSchema = {
  user_email: Joi.string().email().min(6).max(255).trim().required(),
  user_password: Joi.string()
    .regex(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,12}$"))
    .required(),
};

export default userLoginSchema;
