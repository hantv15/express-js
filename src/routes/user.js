const router = require("express").Router();
const userController = require("../controllers/userController");
// get all user
router.get("/", userController.getAllUsers);

// delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;


