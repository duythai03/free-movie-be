const MovieHistory = require("../models/MovieHistory");

const addMovieHistory = (newMovieHistory, userId) => {
  return new Promise(async (resolve, reject) => {
    const { name, slug, poster_url, thumb_url } = newMovieHistory;
    try {
      const checkMovie = await MovieHistory.findOne({
        slug: slug,
        user: userId,
      });

      if (checkMovie !== null) {
        // Cập nhật trường updatedAt nếu phim đã có trong lịch sử
        checkMovie.updatedAt = new Date();
        await checkMovie.save();

        resolve({
          status: "OK",
          message: "Cập nhật thời gian xem phim thành công",
          data: checkMovie,
        });
      } else {
        const movieData = {
          name,
          slug,
          poster_url,
          user: userId,
        };

        // Chỉ thêm thumb_url nếu nó tồn tại
        if (thumb_url) {
          movieData.thumb_url = thumb_url;
        }

        const createdMovie = await MovieHistory.create(movieData);
        resolve({
          status: "OK",
          message: "Đã tự động thêm vào lịch sử",
          data: createdMovie,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const getAllMovies = (userId, limit, page) => {
  return new Promise(async (resolve, reject) => {
    page = page - 1;
    try {
      const totalMovies = await MovieHistory.countDocuments({ user: userId });
      console.log("else condition met");
      const allMovies = await MovieHistory.find({ user: userId })
        .limit(limit)
        .skip(limit * page)
        .sort({ updatedAt: -1 });
      resolve({
        status: "OK",
        message: "success",
        data: allMovies,
        totalMoviesEachPage: limit,
        currentPage: page + 1,
        totalMovies: totalMovies,
        totalPage: Math.ceil(totalMovies / limit),
      });
    } catch (err) {
      reject(err);
    }
  });
};

const deleteHistory = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await MovieHistory.deleteMany({ user: userId });
      if (result.deletedCount === 0) {
        resolve({
          status: "ERR",
          message:
            "Danh sách lịch sử phim của bạn hiện không có phim nào để xóa",
        });
      } else {
        resolve({
          status: "OK",
          message: "Đã xóa toàn bộ phim trong danh sách lịch sử",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { addMovieHistory, getAllMovies, deleteHistory };
