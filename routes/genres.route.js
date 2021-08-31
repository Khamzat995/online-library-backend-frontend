const { Router } = require("express");
const { genresController } = require("../controllers/genres.controller");

const router = Router();

router.get("/", genresController.AllGenres);
router.get("/:id", genresController.getGenresById);
router.post("/", genresController.createGenre);
router.patch("/:id", genresController.editGenres);
router.delete("/:id", genresController.removeGenre);

module.exports = router;
