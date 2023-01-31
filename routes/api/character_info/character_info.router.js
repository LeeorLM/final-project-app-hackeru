const express = require("express");
const router = express.Router();
const authMiddelware = require("../../../middleware/auth.middleware");
const isAdminMiddelware = require("../../../middleware/isAdmin.middleware");
const characterInfoModel = require("../../../models/character_info.model");
const characterInfoValidation = require("../../../validation/character_info.validation");
const CustomResponse = require("../../../classes/CustomResponse.class");

router.get("/getallcharacters", async (req, res) => {
  try {
    const characters = await characterInfoModel.selectAllCharacters();
    res.json(characters);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.post("/addnewcharacter", authMiddelware, isAdminMiddelware, async (req, res) => {
  try {
    const validatedValue = await characterInfoValidation.validateAddNewCharacterSchema(req.body);
    console.log("validatedValue", validatedValue);
    const characterData = await characterInfoModel.selectCharacterByCharacterName(validatedValue.character_name);
    if (characterData.length > 0) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "character already exist");
    }
    const newCharacterData = await characterInfoModel.insertCharacter(
      validatedValue.character_name,
      validatedValue.manga_name,
      validatedValue.character_role,
      validatedValue.character_background,
      validatedValue.character_image
    );
    res.json(new CustomResponse(CustomResponse.STATUSES.success, "character successfuly created", newCharacterData));
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const character = await characterInfoModel.selectCharacterById(req.params.id);
    if (!character) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "character not found");
    }
    res.json(character);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.get("/getcharacter/:name", async (req, res) => {
  try {
    const character = await characterInfoModel.selectCharacterByMangaName(req.params.name);
    if (!character) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "characters not found");
    }
    res.json(character);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log("body", req.body);
    const { error } = await characterInfoValidation.validateUpdateCharacterSchema(req.body);
    if (error) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "somethin went wrong on validation", error.details[0].message);
    }
    const updatedAt = new Date(Date.now());
    const character = await characterInfoModel.updateCharacterById(req.params.id, req.body);
    const updated = await characterInfoModel.updateUpdatedAtbyId(req.params.id, updatedAt);
    if (!character) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "character not found");
    }
    card = await characterInfoModel.selectCharacterById(req.params.id);
    res.send(character);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

router.delete("/:id", async (req, res) => {
  const character = await characterInfoModel.deleteCharacterById(req.params.id);
  if (!character) {
    throw new CustomResponse(CustomResponse.STATUSES.fail, "character not found");
  }
  res.send(character);
});

router.put("/like/:id", async (req, res) => {
  try {
    const character = await characterInfoModel.selectCharacterById(req.params.id);
    if (!character) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "character not found");
    }
    const currentLikes = character.likes;
    const update = await characterInfoModel.updateLikesById(req.params.id, currentLikes + 1);
    const updated = await characterInfoModel.selectCharacterById(req.params.id);
    res.json(updated.likes);
  } catch (err) {
    console.log("err", err);
    res.json(new CustomResponse(CustomResponse.STATUSES.fail, "something went wrong", err));
  }
});

module.exports = router;
