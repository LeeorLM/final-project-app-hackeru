const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookInfoSchema = new Schema({
  book_title: { type: String, required: true },
  manga_name: { type: String, required: true },
  volume_name: { type: String, required: true },
  vol_no: { type: Number, required: true },
  book_description: { type: String },
  retail_value: { type: Number },
  collection_value: { type: Number },
  publisher: { type: String },
  isbn: { type: String, required: true },
  book_image: {
    type: String,
    default: "https://vip12.hachette.co.uk/wp-content/uploads/2018/07/missingbook.png",
  },
  likes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { Type: Date },
});

const Books = mongoose.model("Books", bookInfoSchema);

const insertBook = (
  book_title,
  manga_name,
  volume_name,
  vol_no,
  book_description,
  retail_value,
  collection_value,
  publisher,
  isbn,
  book_image
) => {
  const book = new Books({
    book_title,
    manga_name,
    volume_name,
    vol_no,
    book_description,
    retail_value,
    collection_value,
    publisher,
    isbn,
    book_image,
  });
  return book.save();
};

const selectAllBooks = () => {
  return Books.find();
};

const selectBookById = (_id) => {
  return Books.findOne({ _id });
};

const selectBooksByMangaName = (manga_name) => {
  return Books.find({ manga_name: new RegExp("^" + manga_name + "$", "i") });
};

const updateBookById = (_id, data) => {
  return Books.findOneAndUpdate({ _id }, data);
};

const deleteBookById = (_id) => {
  return Books.findByIdAndRemove({ _id });
};

const updateLikesById = (_id, likes) => {
  return Books.findOneAndUpdate({ _id }, { likes });
};

const updateUpdatedAtbyId = (_id, updated_at) => {
  return Books.findOneAndUpdate({ _id }, { updated_at });
};

const selectBookByBookTitle = (book_title) => {
  return Books.findOne({ book_title });
};

module.exports = {
  insertBook,
  selectAllBooks,
  selectBooksByMangaName,
  selectBookById,
  updateBookById,
  deleteBookById,
  updateUpdatedAtbyId,
  selectBookByBookTitle,
  updateLikesById,
};
