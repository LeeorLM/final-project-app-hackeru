const express = require("express");
const router = express.Router();
const authMiddelware = require("../../../middleware/auth.middleware");
const isAdminMiddelware = require("../../../middleware/isAdmin.middleware");
const mangaInfoModel = require("../../../models/manga_info.model");
const mangaInfoValidation = require("../../../validation/manga_info.validation");
const CustomResponse = require("../../../classes/CustomResponse.class");

router.get("/getallmangas", async (req, res) => {
  try {
    const mangas = await mangaInfoModel.selectAllMangas();
    res.json(mangas);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "Something went wrong", err));
  }
});

router.post("/addnewmanga", authMiddelware, isAdminMiddelware, async (req, res) => {
  try {
    const validatedValue = await mangaInfoValidation.validateAddNewMangaSchema(req.body);
    console.log("validatedValue", validatedValue);
    const mangaData = await mangaInfoModel.selectMangaBytitle(validatedValue.manga_title);
    if (mangaData.length > 0) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "manga already exist");
    }
    const newMangaData = await mangaInfoModel.insertManga(
      validatedValue.manga_title,
      validatedValue.type,
      validatedValue.manga_background,
      validatedValue.story_description,
      validatedValue.story_by,
      validatedValue.art_by,
      validatedValue.volumes,
      validatedValue.chapters,
      validatedValue.published,
      validatedValue.genres,
      validatedValue.manga_status,
      validatedValue.serialization,
      validatedValue.manga_image
    );
    res.json(new CustomResponse(CustomResponse.STATUSES.success, "manga successfuly created", newMangaData));
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.get("/getmanga/:origin", async (req, res) => {
  try {
    const manga = await mangaInfoModel.selectMangaByMangaName(req.params.origin);
    if (!manga) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "manga not found");
    }
    res.json(manga);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.get("/getmanga2/:name", async (req, res) => {
  try {
    const manga = await mangaInfoModel.selectMangaByMangaName(req.params.origin);
    if (!manga) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "manga not found");
    }
    res.json(manga);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.get("/getmangas/:name", async (req, res) => {
  try {
    const manga = await mangaInfoModel.selectMangasByMangaName(req.params.name);
    if (!manga) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "mangas not found");
    }
    res.json(manga);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

// find by id
router.get("/:id", async (req, res) => {
  try {
    const manga = await mangaInfoModel.selectMangaById(req.params.id);
    if (!manga) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "manga not found");
    }
    res.json(manga);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    console.log("body", req.body);
    const { error } = await mangaInfoValidation.validateUpdateMangaSchema(req.body);
    if (error) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "somethin went wrong on validation", error.details[0].message);
    }
    const updatedAt = new Date(Date.now());
    const manga = await mangaInfoModel.updateMangaById(req.params.id, req.body);
    const updated = await mangaInfoModel.updateUpdatedAtbyId(req.params.id, updatedAt);
    if (!manga) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "manga not found");
    }
    card = await mangaInfoModel.selectMangaById(req.params.id);
    res.send(manga);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const manga = await mangaInfoModel.deleteMangaById(req.params.id);
  if (!manga) {
    throw new CustomResponse(CustomResponse.STATUSES.fail, "manga not found");
  }
  res.send(manga);
});

router.put("/like/:id", async (req, res) => {
  try {
    const manga = await mangaInfoModel.selectMangaById(req.params.id);
    if (!manga) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "manga not found");
    }
    const currentLikes = manga.likes;
    const update = await mangaInfoModel.updateLikesById(req.params.id, currentLikes + 1);
    const updated = await mangaInfoModel.selectMangaById(req.params.id);
    res.json(updated.likes);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.get("/getlikes", async (req, res) => {
  try {
    const mangas = await mangaInfoModel.selectAllMangas();
    res.json(mangas);
    console.log("mangas", mangas);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "Something went wrong", err));
  }
});

module.exports = router;
