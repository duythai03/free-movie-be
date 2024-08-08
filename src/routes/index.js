const userRouter = require("./UserRouter");
const favMovieRouter = require("./FavMovieRouter");
const movieHistoryRouter = require("./MovieHistoryRouter");

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/fav-movie", favMovieRouter);
  app.use("/api/movie-history", movieHistoryRouter);
};
module.exports = routes;
