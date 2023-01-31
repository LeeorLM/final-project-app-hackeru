const express = require("express");
const router = express.Router();
const authMiddelware = require("../../../middleware/auth.middleware");
const isAdminMiddelware = require("../../../middleware/isAdmin.middleware");
const bookInfoModel = require("../../../models/book_info.model");
const bookInfoValidation = require("../../../validation/book_info.validation");
const CustomResponse = require("../../../classes/CustomResponse.class");

router.get("/getallbooks", async (req, res) => {
  try {
    const books = await bookInfoModel.selectAllBooks();
    res.json(books);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.post("/addnewbook", authMiddelware, isAdminMiddelware, async (req, res) => {
  try {
    const validatedValue = await bookInfoValidation.validateAddNewBookSchema(req.body);
    console.log("validatedValue", validatedValue);
    const bookData = await bookInfoModel.selectBookByBookTitle(validatedValue.book_title);
    console.log("bookData", bookData);
    if (bookData.length > 0) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "book already exist");
    }
    const newBookData = await bookInfoModel.insertBook(
      validatedValue.book_title,
      validatedValue.manga_name,
      validatedValue.volume_name,
      validatedValue.vol_no,
      validatedValue.book_description,
      validatedValue.retail_value,
      validatedValue.collection_value,
      validatedValue.publisher,
      validatedValue.isbn,
      validatedValue.book_image
    );
    res.json(new CustomResponse(CustomResponse.STATUSES.success, "book successfuly created", newBookData));
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.get("/getbook/:name", async (req, res) => {
  try {
    const book = await bookInfoModel.selectBooksByMangaName(req.params.name);
    if (!book) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "books not found");
    }
    res.json(book);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});
router.get("/getbooktitle/:name", async (req, res) => {
  try {
    const book = await bookInfoModel.selectBookByBookTitle(req.params.name);
    if (!book) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "books not found");
    }
    res.json(book);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await bookInfoModel.selectBookById(req.params.id);
    if (!book) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "book not found");
    }
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log("body", req.body);
    const { error } = await bookInfoValidation.validateUpdateBookSchema(req.body);
    if (error) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "somethin went wrong on validation", error.details[0].message);
    }
    const updatedAt = new Date(Date.now());
    const book = await bookInfoModel.updateBookById(req.params.id, req.body);
    const updated = await bookInfoModel.updateUpdatedAtbyId(req.params.id, updatedAt);
    if (!book) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "book not found");
    }
    card = await bookInfoModel.selectBookById(req.params.id);
    res.send(card);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.delete("/:id", async (req, res) => {
  const book = await bookInfoModel.deleteBookById(req.params.id);
  if (!book) {
    throw new CustomResponse(CustomResponse.STATUSES.fail, "book not found");
  }
  res.send(book);
});

router.put("/like/:id", async (req, res) => {
  try {
    const book = await bookInfoModel.selectBookById(req.params.id);
    if (!book) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "book not found");
    }
    const currentLikes = book.likes;
    const update = await bookInfoModel.updateLikesById(req.params.id, currentLikes + 1);
    const updated = await bookInfoModel.selectBookById(req.params.id);
    res.json(updated.likes);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

module.exports = router;
