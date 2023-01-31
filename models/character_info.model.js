const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterInfoSchema = new Schema({
  character_name: { type: String, required: true },
  manga_name: [{ type: String, required: true }],
  character_role: { type: String, required: true },
  character_background: { type: String },
  character_image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  likes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { Type: Date },
});

const Characters = mongoose.model("Characters", characterInfoSchema);

const insertCharacter = (
  character_name,
  manga_name,
  character_role,
  character_background,
  character_image
) => {
  const character = new Characters({
    character_name,
    manga_name,
    character_role,
    character_background,
    character_image,
  });
  return character.save();
};

const selectAllCharacters = () => {
  return Characters.find();
};

const selectCharacterById = (_id) => {
  return Characters.findOne({ _id });
};

const updateCharacterById = (_id, data) => {
  return Characters.findOneAndUpdate({ _id }, data);
};

const deleteCharacterById = (_id) => {
  return Characters.findByIdAndRemove({ _id });
};

const updateUpdatedAtbyId = (_id, updated_at) => {
  return Characters.findOneAndUpdate({ _id }, { updated_at });
};

const selectCharacterByCharacterName = (character_name) => {
  return Characters.find({ character_name });
};

const selectCharacterByMangaName = (manga_name) => {
  return Characters.find({ manga_name: new RegExp("^" + manga_name + "$", "i") });
};

const selectCharacterByCharacterRole = (character_role) => {
  return Characters.find({ character_role });
};

const updateLikesById = (_id, likes) => {
  return Characters.findOneAndUpdate({ _id }, { likes });
};

module.exports = {
  insertCharacter,
  selectAllCharacters,
  selectCharacterById,
  updateCharacterById,
  deleteCharacterById,
  updateUpdatedAtbyId,
  selectCharacterByCharacterName,
  selectCharacterByMangaName,
  selectCharacterByCharacterRole,
  updateLikesById,
};
