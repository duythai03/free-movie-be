const express = require("express");
const router = express.Router();
const MovieHistoryController = require("../controllers/MovieHistoryController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/add", authMiddleware, MovieHistoryController.addMovieHistory);
router.get(
  "/get-all-movies",
  authMiddleware,
  MovieHistoryController.getAllMovies
);
router.delete(
  "/delete-history",
  authMiddleware,
  MovieHistoryController.deleteHistory
);
module.exports = router;
