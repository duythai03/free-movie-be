const FavMovieService = require("../services/FavMovieService");

const addFavMovie = async (req, res) => {
  try {
    const { name, slug, poster_url, thumb_url } = req.body;
    const userId = req.user.id; // Lấy userId từ request, giả sử bạn đã authenticate user
    console.log("userId", userId);

    if (!name || !slug || !poster_url || !thumb_url) {
      return res.status(400).json({
        status: "ERR",
        message: "Tất cả các trường đều bắt buộc",
      });
    }

    const result = await FavMovieService.addFavMovie(req.body, userId);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const getDetailsMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const userId = req.user.id;

    if (!movieId) {
      return res.status(400).json({
        status: "ERR",
        message: "Movie ID là bắt buộc",
      });
    }

    const result = await FavMovieService.getDetailsMovie(movieId, userId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const userId = req.user.id;

    if (!movieId) {
      return res.status(400).json({
        status: "ERR",
        message: "Movie ID là bắt buộc",
      });
    }

    const result = await FavMovieService.deleteMovie(movieId, userId);
    return res.status(200).json(result);
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
    const { limit, page, sort } = req.query;
    const result = await FavMovieService.getAllMovies(
      userId,
      limit || 10,
      page || 1,
      sort
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message,
    });
  }
};

module.exports = {
  addFavMovie,
  getDetailsMovie,
  deleteMovie,
  getAllMovies,
};
