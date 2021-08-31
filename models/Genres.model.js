const mongoose = require("mongoose");

const genresSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Genres = mongoose.model("Genre", genresSchema);

module.exports = Genres;
