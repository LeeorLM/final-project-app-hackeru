const express = require("express");
const router = express.Router();
const userRouter = require("./user/user.router");
const mangaInfoRouter = require("./manga_info/manga_info.router");
const characterInfoRouter = require("./character_info/character_info.router");
const bookInfoModel = require("./book_info/book_info.router");

router.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

router.use("/user", userRouter);
router.use("/manga", mangaInfoRouter);
router.use("/character", characterInfoRouter);
router.use("/book", bookInfoModel);

module.exports = router;
