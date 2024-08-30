const MovieHistoryService = require("../services/MovieHistoryService");

const addMovieHistory = async (req, res) => {
  try {
    const { name, slug, poster_url, thumb_url } = req.body;
    const userId = req.user.id;
    console.log("userId", userId);

    if (!name || !slug || !poster_url) {
      return res.status(400).json({
        status: "ERR",
        message: "Tất cả các trường đều bắt buộc!",
      });
    }

    const movieData = {
      name,
      slug,
      poster_url,
    };
    if (thumb_url) {
      movieData.thumb_url = thumb_url;
    }

    const result = await MovieHistoryService.addMovieHistory(movieData, userId);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit, page } = req.query;
    const result = await MovieHistoryService.getAllMovies(
      userId,
      limit || 10,
      page || 1
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await MovieHistoryService.deleteHistory(userId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

module.exports = {
  addMovieHistory,
  getAllMovies,
  deleteHistory,
};
