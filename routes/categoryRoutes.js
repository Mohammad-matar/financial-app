const router = require("express").Router();
const controller = require("../controllers/categoryController");
const auth = require('../controllers/userController');

router.get("/", controller.getAllCategories);
router.get("/get-default-by-type", auth.protect, controller.getDefaultCategoriesByType);
router.get("/get-default-of-admin-and-user", auth.protect, controller.getDefaultCategoriesToTheAdminAndUser);
router.get("/get-default-by-type", auth.protect, controller.getDefaultCategoriesByType);
router.get("/get-default-with-customized-by-type", auth.protect, controller.getDefaultCategoriesWithCustomizeByType);
router.get("/:id", controller.getCategoryById);
router.post("/", auth.protect, controller.addCategory);
router.put("/:id", controller.editOneCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;