const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create user schema */
const usersSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  user_phone: { type: String },
  user_image: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  user_nickname: { type: String },
  user_age: { type: Number },
  user_birthday: { type: String },
  liked_manga: [
    {
      manga_name: { type: String },
      manga_id: { type: String },
      like: { type: Boolean },
    },
  ],
  liked_book: [
    {
      book_name: { type: String },
      book_id: { type: String },
      like: { type: Boolean },
    },
  ],
  liked_character: [
    {
      character_name: { type: String },
      character_id: { type: String },
      like: { type: Boolean },
    },
  ],

  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  recovery: {
    secretKey: { type: String },
    dateRecovery: { type: Date },
  },
});

const Users = mongoose.model("Users", usersSchema);

const insertUser = (first_name, last_name, user_email, user_password, user_phone, user_image) => {
  const user = new Users({
    first_name,
    last_name,
    user_email,
    user_password,
    user_phone,
    user_image,
  });
  return user.save();
};

const selectAllUsers = () => {
  return Users.find();
};

const selectUserById = (_id) => {
  return Users.find({ _id });
};
const selectUserById2 = (_id) => {
  return Users.findOne({ _id });
};

const selectUserByEmail = (user_email) => {
  return Users.find({ user_email });
};

const findInLikedArrMangaName = (id, manga_name) => {
  return Users.find({ _id: id, "liked_manga.manga_name": manga_name });
};

const findInLikedArrBookName = (id, book_name) => {
  return Users.find({ _id: id, "liked_book.book_name": book_name });
};

const findInLikedArrCharacterName = (id, character_name) => {
  return Users.find({ _id: id, "liked_character.character_name": character_name });
};

const findLikedById = (_id, liked) => {
  return Users.findOne({ _id }, liked);
};

const updateLikedMangaById = (_id, data) => {
  return Users.updateOne({ _id }, { $push: { liked_manga: data } });
};

const deleteLikedMangaById = (_id, data) => {
  return Users.updateMany({ _id }, { $pull: { liked_manga: { manga_id: data } } });
};

const updateLikedBookById = (_id, data) => {
  return Users.updateOne({ _id }, { $push: { liked_book: data } });
};

const deleteLikedBookById = (_id, data) => {
  return Users.updateOne({ _id }, { $pull: { liked_book: { book_id: data } } });
};

const updateLikedCharacterById = (_id, data) => {
  return Users.updateOne({ _id }, { $push: { liked_character: data } });
};
const deleteLikedCharacterById = (_id, data) => {
  return Users.updateOne({ _id }, { $pull: { liked_character: { character_id: data } } });
};

const updateRecovery = (user_email, key, date) => {
  return Users.updateOne({ user_email }, { "recovery.secretKey": key, "recovery.dateRecovery": date });
};

const updatePassword = (user_email, user_password) => {
  return Users.updateOne({ user_email }, { user_password, "recovery.secretKey": "" });
};

const updateUserInfo = (_id, data) => {
  return Users.findOneAndUpdate({ _id }, data);
};

module.exports = {
  insertUser,
  selectAllUsers,
  selectUserById,
  selectUserByEmail,
  updateLikedMangaById,
  updateLikedBookById,
  updateLikedCharacterById,
  findLikedById,
  findInLikedArrMangaName,
  findInLikedArrBookName,
  findInLikedArrCharacterName,
  updateRecovery,
  updatePassword,
  updateUserInfo,
  selectUserById2,
  deleteLikedMangaById,
  deleteLikedCharacterById,
  deleteLikedBookById,
};
