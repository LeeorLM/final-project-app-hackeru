const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managaInfoSchema = new Schema({
  manga_id: { type: Number },
  manga_title: { type: String, required: true },
  type: { type: String, default: "Manga" },
  manga_background: { type: String },
  story_description: { type: String, required: true },
  story_by: { type: String },
  art_by: { type: String },
  volumes: { type: Number, required: true },
  chapters: { type: Number, required: true },
  published: { type: String },
  genres: [{ type: String }],
  serialization: { type: String, required: true },
  manga_status: { type: String, required: true },
  likes: { type: Number, default: 0 },
  manga_image: {
    type: String,
    default: "https://vip12.hachette.co.uk/wp-content/uploads/2018/07/missingbook.png",
  },
  // user_id: { type: Schema.Types.ObjectId, ref: "Users" },

  created_at: { type: Date, default: Date.now },
  updated_at: { Type: Date },
});

const Mangas = mongoose.model("Mangas", managaInfoSchema);

const insertManga = (
  manga_title,
  type,
  manga_background,
  story_description,
  story_by,
  art_by,
  volumes,
  chapters,
  published,
  genres,
  manga_status,
  serialization,
  manga_image
) => {
  const manga = new Mangas({
    manga_title,
    type,
    manga_background,
    story_description,
    story_by,
    art_by,
    volumes,
    chapters,
    published,
    genres,
    manga_status,
    serialization,
    manga_image,
  });
  return manga.save();
};

const selectAllMangas = () => {
  return Mangas.find();
};

const selectMangaById = (_id) => {
  return Mangas.findOne({ _id });
};

const updateLikesById = (_id, likes) => {
  return Mangas.findOneAndUpdate({ _id }, { likes });
};

const findByLikes = (likes) => {
  return Mangas.find({ likes });
};

const selectMangaByMangaName = (manga_title) => {
  return Mangas.findOne({ manga_title });
};

const selectMangasByMangaName = (manga_title) => {
  return Mangas.find({ manga_title });
};

const updateMangaById = (_id, data) => {
  return Mangas.findOneAndUpdate({ _id }, data);
};

const deleteMangaById = (_id) => {
  return Mangas.findByIdAndRemove({ _id });
};

const updateUpdatedAtbyId = (_id, updated_at) => {
  return Mangas.findOneAndUpdate({ _id }, { updated_at });
};

const selectMangaBySerialization = (serialization) => {
  return Mangas.find({ serialization });
};
const selectMangaBytitle = (manga_title) => {
  return Mangas.find({ manga_title });
};

const findMangaByFirstLetter = (letter) => {
  return Mangas.find({ manga_title: { $regex: "^" + letter, $options: "i" } });
};

module.exports = {
  insertManga,
  selectAllMangas,
  selectMangaById,
  updateLikesById,
  updateMangaById,
  deleteMangaById,
  updateUpdatedAtbyId,
  selectMangaBySerialization,
  selectMangaBytitle,
  findByLikes,
  selectMangaByMangaName,
  selectMangasByMangaName,
  findMangaByFirstLetter,
};
