const router = require("express").Router();

router.use("/user", require("./userRoutes")); // the main route for user and import it's routes fron it's file

// here you'll be adding the routes for other collections like for product
router.use("/transactions", require("./transactionRoutes"));
// ...

module.exports = router;