const router = require("express").Router();
const controller = require("../controllers/categoryController");


router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCategoryById);
router.post("/", controller.addCategory);
router.put("/:id", controller.editOneCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;