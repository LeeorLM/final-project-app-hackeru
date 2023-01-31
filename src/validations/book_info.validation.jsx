import Joi from "joi-browser";

const addNewBookSchema = {
  book_title: Joi.string().required(),
  manga_name: Joi.string().min(2).required(),
  volume_name: Joi.string().min(2).required(),
  vol_no: Joi.number().required(),
  book_description: Joi.string().min(2),
  retail_value: Joi.number(),
  collection_value: Joi.number(),
  publisher: Joi.string(),
  isbn: Joi.string().required(),
  book_image: Joi.string().uri(),
};

export default addNewBookSchema;
