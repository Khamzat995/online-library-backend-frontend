const Genres = require("../models/Genres.model");

module.exports.genresController = {
  AllGenres: async (req, res) => {
    try {
      const genres = await Genres.find();
      res.render("home", {
        book: genres,
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getGenresById: async (req, res) => {
    const { id } = req.params;
    try {
      const genres = await Genres.findById(id);
      res.render("home", {
        book: genres,
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createGenre: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать название нового Жанра",
      });
    }

    try {
      const genres = await Genres.create({ name });

      return res.json(genres);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editGenres: async (req, res) => {
    try {
      const patch = await Genres.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      await patch.save();
      res.json("Жанр успешно изменен");
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeGenre: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Genres.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить жанр. Укажите верный ID",
        });
      }

      return res.json({
        message: "Жанр успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
