import Joi from "joi-browser";

const userRegisterSchema = {
  first_name: Joi.string().min(2).max(255).required(),
  last_name: Joi.string().min(2).max(255).required(),
  user_email: Joi.string().email().min(6).max(255).trim().required(),
  user_password: Joi.string()
    .regex(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,12}$"))
    .required(),
  confirm_password: Joi.ref("user_password"),
  user_phone: Joi.string().min(7).max(255).trim(),
  user_image: Joi.string().uri(),
};

export default userRegisterSchema;
