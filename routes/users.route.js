const { Router } = require("express");
const { userController } = require("../controllers/users.controller");

const router = Router();

router.post("/user", userController.createUser);
router.get("/user/:id?", userController.getUserId);
router.patch("/user/:id", userController.editUser);
router.delete("/admin/user/:id", userController.removeUser);
router.get("/admin/users", userController.getUserByAdmin);
router.get("/admin/users/:id", userController.getUserProfile);
router.get("/users/:userId", userController.getProfile);
router.get("/users/:userId/rentBook/:bookId", userController.rentBook);
router.get("/users/:userId/returnBook/:bookId", userController.returnBook);


module.exports = router;
