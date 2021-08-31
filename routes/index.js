const { Router } = require("express");
const router = Router();

router.use('/book', require("./books.route"));
router.use('/genres', require("./genres.route"));
router.use('/', require("./users.route"));

module.exports = router;
