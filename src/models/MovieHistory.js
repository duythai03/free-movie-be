const mongoose = require("mongoose");
const movieHistorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    poster_url: { type: String, required: true },
    thumb_url: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
const MovieHistory = mongoose.model("MovieHistory", movieHistorySchema);
module.exports = MovieHistory;
