const { Router } = require("express");
const { booksController } = require("../controllers/books.controller");

const router = Router();


router.get("/", booksController.allBooks);
router.get("/:id", booksController.getBookId);
router.get("/:id/book", booksController.getBookCat);
router.get("/genres/:id", booksController.getBooksGenreById);
router.post("/admin/book", booksController.createBook);
router.patch("/admin/book/:id", booksController.editBook);
router.delete("/admin/book/:id", booksController.removeBook);
router.get("/admin/user/:bookId", booksController.takeBook);
router.get("/admin/block/:userId", booksController.blockProfile);
router.get("/admin/unblock/:userId", booksController.unblockProfile);


module.exports = router;
