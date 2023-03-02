const router = require("express").Router();
const controller = require("../controllers/transactionControllers");
const auth = require('../controllers/userController')

router.get("/", controller.getTransactions);
router.get("/get-transaction-by-user-id", auth.protect, controller.getTransactionByUserId);
router.get("/get-transaction-by-type", auth.protect, controller.getTransactionByType);
router.get("/get-transaction-by-date", auth.protect, controller.getTransactionByDate);
router.get("/get-transaction-by-years-months-weeks-days", auth.protect, controller.getTransactionByYearsMonthsWeeksDays);
router.get("/get-transaction-by-category", auth.protect, controller.getTransactionByCategory);
router.get("/:id", controller.getTransactionById);
router.post("/", auth.protect, controller.addTransaction);
router.put("/:id", controller.editTransication);
router.delete("/:id", controller.deleteTransaction);

module.exports = router;