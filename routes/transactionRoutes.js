const router = require("express").Router();
const controller = require("../controllers/transactionControllers");


router.get("/", controller.getTransactions);
router.get("/:id", controller.getTransactionById);
router.post("/", controller.addTransaction);
router.put("/:id", controller.editTransication);
router.delete("/:id", controller.deleteTransaction);

module.exports = router;