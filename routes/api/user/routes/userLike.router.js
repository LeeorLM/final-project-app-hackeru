const express = require("express");
const router = express.Router();
const logger = require("../../../../config/winston");
const userModel = require("../../../../models/user.model");
const userValidation = require("../../../../validation/user.validation");
const CustomResponse = require("../../../../classes/CustomResponse.class");

router.get("/getliked/:id/:category", async (req, res) => {
  try {
    const userLike = await userModel.findLikedById(req.params.id, req.params.category);
    res.json(userLike);
  } catch (err) {
    console.log(err);
  }
});

router.put("/manga/:id", async (req, res) => {
  try {
    console.log("body", req.body);
    const validatedValue = await userValidation.validatedLikedMangaSchema(req.body);
    console.log("validatedValue", validatedValue.manga_name);
    const mangaName = await userModel.findInLikedArrMangaName(req.params.id, validatedValue.manga_name);
    if (mangaName.length > 0) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "like already exist");
    }
    const user = await userModel.updateLikedMangaById(req.params.id, req.body);
    card = await userModel.selectUserById(req.params.id);
    res.send(card);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.put("/book/:id", async (req, res) => {
  try {
    console.log("body", req.body);
    const validatedValue = await userValidation.validatedLikedBookSchema(req.body);
    console.log("validatedValue", validatedValue.book_name);
    const bookName = await userModel.findInLikedArrBookName(req.params.id, validatedValue.book_name);
    if (bookName.length > 0) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "like already exist");
    }
    const user = await userModel.updateLikedBookById(req.params.id, req.body);
    card = await userModel.selectUserById(req.params.id);
    res.send(card);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.put("/character/:id", async (req, res) => {
  try {
    console.log("body", req.body);
    const validatedValue = await userValidation.validatedLikedCharacterSchema(req.body);
    console.log("validatedValue", validatedValue.character_name);
    const characterName = await userModel.findInLikedArrCharacterName(req.params.id, validatedValue.character_name);
    if (characterName.length > 0) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "like already exist");
    }
    const user = await userModel.updateLikedCharacterById(req.params.id, req.body);
    card = await userModel.selectUserById(req.params.id);
    res.send(card);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

// delete manga user like
router.delete("/delete/manga/:id/:liked_id", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const userLike = await userModel.deleteLikedMangaById(req.params.id, req.params.liked_id);
    if (!userLike) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "userLike not deleted");
    }
    res.send(userLike);
  } catch (err) {
    console.log(err);
  }
});

// delete book user like
router.delete("/delete/book/:id/:liked_id", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const userLike = await userModel.deleteLikedBookById(req.params.id, req.params.liked_id);
    if (!userLike) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "userLike not deleted");
    }
    res.send(userLike);
  } catch (err) {
    console.log(err);
  }
});

// delete character user like
router.delete("/delete/character/:id/:liked_id", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const userLike = await userModel.deleteLikedCharacterById(req.params.id, req.params.liked_id);
    if (!userLike) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "userLike not deleted");
    }
    res.send(userLike);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
