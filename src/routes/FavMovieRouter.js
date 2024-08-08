const express = require("express");
const router = express.Router();
const favMovieController = require("../controllers/FavMovieController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/add", authMiddleware, favMovieController.addFavMovie);
router.get(
  "/get-details-movie/:id",
  authMiddleware,
  favMovieController.getDetailsMovie
);
router.delete(
  "/delete-movie/:id",
  authMiddleware,
  favMovieController.deleteMovie
);
router.get("/get-all-movies", authMiddleware, favMovieController.getAllMovies);

module.exports = router;
