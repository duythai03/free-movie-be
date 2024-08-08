const FavMovie = require("../models/FavMovie");

const addFavMovie = (newFavMovie, userId) => {
  return new Promise(async (resolve, reject) => {
    const { name, slug, poster_url, thumb_url } = newFavMovie;
    try {
      const checkMovie = await FavMovie.findOne({ slug: slug, user: userId });
      if (checkMovie !== null) {
        resolve({
          status: "ERR",
          message: "Phim đã tồn tại trong danh sách yêu thích của bạn",
        });
      } else {
        const createdMovie = await FavMovie.create({
          name,
          slug,
          poster_url,
          thumb_url,
          user: userId, // Thêm userId khi tạo phim yêu thích mới
        });
        resolve({
          status: "OK",
          message: "Đã thêm vào danh sách phim yêu thích",
          data: createdMovie,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const getDetailsMovie = (id, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const movie = await FavMovie.findOne({ _id: id, user: userId });
      if (movie === null) {
        resolve({
          status: "ERR",
          message: "Phim không tồn tại trong danh sách của bạn",
        });
      } else {
        resolve({
          status: "OK",
          message: "Thành công",
          data: movie,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const deleteMovie = (id, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const movie = await FavMovie.findOne({ _id: id, user: userId });
      if (movie === null) {
        resolve({
          status: "ERR",
          message: "Phim không tồn tại trong danh sách của bạn",
        });
      } else {
        await FavMovie.findByIdAndDelete(id);
        resolve({
          status: "OK",
          message: "Xóa thành công",
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
      const totalMovies = await FavMovie.countDocuments({ user: userId });
      if (sort && sort.length === 2) {
        console.log("Sort condition met");
        const objectSort = {};
        objectSort[sort[0]] = sort[1];
        const allMoviesSort = await FavMovie.find({ user: userId })
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
        const allMovies = await FavMovie.find({ user: userId })
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

module.exports = { addFavMovie, getDetailsMovie, deleteMovie, getAllMovies };
