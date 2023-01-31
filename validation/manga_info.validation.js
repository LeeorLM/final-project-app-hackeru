const Joi = require("joi");

const mangaTitleRole = {
  manga_title: Joi.string().min(2).max(255).required(),
};

const mangaBackgroundRole = {
  manga_background: Joi.string().min(2).required(),
};

const mangaTypeRole = {
  type: Joi.string(),
};

const storyDescriptionRole = {
  story_description: Joi.string().min(2).required(),
};

const storyByRole = {
  story_by: Joi.string().min(2),
};

const artByRole = {
  art_by: Joi.string().min(2),
};

const volumesRole = {
  volumes: Joi.number().required(),
};

const chaptersRole = {
  chapters: Joi.number().required(),
};

const publishedRole = {
  published: Joi.string(),
};

const genresRole = {
  genres: Joi.array(),
};

const mangaStatusRole = {
  manga_status: Joi.string(),
};

const serializationRole = {
  serialization: Joi.string(),
};

const mangaImageRole = {
  manga_image: Joi.string().uri(),
};

const addNewMangaSchema = Joi.object({
  ...mangaTitleRole,
  ...mangaTypeRole,
  ...mangaBackgroundRole,
  ...storyDescriptionRole,
  ...storyByRole,
  ...artByRole,
  ...volumesRole,
  ...chaptersRole,
  ...publishedRole,
  ...genresRole,
  ...mangaStatusRole,
  ...serializationRole,
  ...mangaImageRole,
});

const updateMangaSchema = Joi.object({
  ...mangaTitleRole,
  ...mangaTypeRole,
  ...mangaBackgroundRole,
  ...storyDescriptionRole,
  ...storyByRole,
  ...artByRole,
  ...volumesRole,
  ...chaptersRole,
  ...publishedRole,
  ...genresRole,
  ...mangaStatusRole,
  ...serializationRole,
  ...mangaImageRole,
});

const validateAddNewMangaSchema = (data) => {
  return addNewMangaSchema.validateAsync(data, { abortEarly: false });
};

const validateUpdateMangaSchema = (data) => {
  return updateMangaSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateAddNewMangaSchema,
  validateUpdateMangaSchema,
};
