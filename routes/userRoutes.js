const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/", controller.getUsers);
router.put("/:id", controller.editUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;