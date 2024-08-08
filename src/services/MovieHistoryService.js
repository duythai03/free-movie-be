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
        resolve({
          status: "ERR",
          message: "Phim đã lưu vào lịch sử xem của bạn",
        });
      } else {
        const createdMovie = await MovieHistory.create({
          name,
          slug,
          poster_url,
          thumb_url,
          user: userId,
        });
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

const getAllMovies = (userId, limit, page, sort) => {
  return new Promise(async (resolve, reject) => {
    page = page - 1;
    try {
      const totalMovies = await MovieHistory.countDocuments({ user: userId });
      if (sort && sort.length === 2) {
        console.log("Sort condition met");
        const objectSort = {};
        objectSort[sort[0]] = sort[1];
        const allMoviesSort = await MovieHistory.find({ user: userId })
          .limit(limit)
          .skip(limit * page)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "success",
          data: allMoviesSort,
          totalMoviessEachPage: limit,
          currentPage: page + 1,
          sort: objectSort,
          totalMovies: totalMovies,
          totalPage: Math.ceil(totalMovies / limit),
        });
      } else {
        console.log("else condition met");
        const allMovies = await MovieHistory.find({ user: userId })
          .limit(limit)
          .skip(limit * page);
        resolve({
          status: "OK",
          message: "success",
          data: allMovies,
          totalMoviesEachPage: limit,
          currentPage: page + 1,
          totalMovies: totalMovies,
          totalPage: Math.ceil(totalMovies / limit),
        });
      }
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
