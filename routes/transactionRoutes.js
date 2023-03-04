const router = require("express").Router();
const controller = require("../controllers/transactionControllers");
const auth = require('../controllers/userController');

router.get("/", controller.getTransactions);
router.get("/get-transaction-by-user-id", auth.protect, controller.getTransactionByUserId);
router.get("/get-transaction-by-type", auth.protect, controller.getTransactionByType);
router.get("/get-transaction-by-date", auth.protect, controller.getTransactionByDate);
router.get("/get-transaction-by-month", auth.protect, controller.getTransactionByMonth);
router.get("/get-transaction-by-year", auth.protect, controller.getTransactionByYear);
router.get("/get-transaction-by-category", auth.protect, controller.getTransactionByCategory);
router.get("/get-transaction-with-total-of-type", auth.protect, controller.getTotalByType);
router.get("/get-transaction-with-total-amount", auth.protect, controller.getTotalAmount);
router.get("/:id", controller.getTransactionById);
router.post("/", auth.protect, controller.addTransaction);
router.put("/:id", auth.protect, controller.editTransication);
router.delete("/:id", auth.protect, controller.deleteTransaction);

module.exports = router;