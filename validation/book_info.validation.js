const Joi = require("joi");

const bookTitleRole = {
  book_title: Joi.string().required(),
};

const mangaNameRole = {
  manga_name: Joi.string().min(2).required(),
};

const volumeNameRole = {
  volume_name: Joi.string().min(2).required(),
};

const volNoRole = {
  vol_no: Joi.number().required(),
};

const bookDescriptionRole = {
  book_description: Joi.string().min(2),
};

const retailValueRole = {
  retail_value: Joi.number(),
};

const collectionValueRole = {
  collection_value: Joi.number(),
};

const publisherRole = {
  publisher: Joi.string(),
};

const isbnRole = {
  isbn: Joi.string().required(),
};

const bookImageRole = {
  book_image: Joi.string().uri(),
};

const addNewBookSchema = Joi.object({
  ...bookTitleRole,
  ...mangaNameRole,
  ...volumeNameRole,
  ...volNoRole,
  ...bookDescriptionRole,
  ...retailValueRole,
  ...collectionValueRole,
  ...publisherRole,
  ...isbnRole,
  ...bookImageRole,
});

const updateBookSchema = Joi.object({
  ...bookTitleRole,
  ...mangaNameRole,
  ...volumeNameRole,
  ...volNoRole,
  ...bookDescriptionRole,
  ...retailValueRole,
  ...collectionValueRole,
  ...publisherRole,
  ...isbnRole,
  ...bookImageRole,
});

const validateAddNewBookSchema = (data) => {
  return addNewBookSchema.validateAsync(data, { abortEarly: false });
};

const validateUpdateBookSchema = (data) => {
  return updateBookSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateAddNewBookSchema,
  validateUpdateBookSchema,
};
