import Joi from "joi-browser";

const addNewMangaSchema = {
  manga_title: Joi.string().min(2).max(255).required(),
  manga_background: Joi.string().min(2).required(),
  story_description: Joi.string().min(2).required(),
  story_by: Joi.string().min(2),
  art_by: Joi.string().min(2),
  volumes: Joi.number().required(),
  chapters: Joi.number().required(),
  published: Joi.string(),
  genres: Joi.array(),
  manga_status: Joi.string(),
  serialization: Joi.string(),
  manga_image: Joi.string().uri(),
};

export default addNewMangaSchema;
