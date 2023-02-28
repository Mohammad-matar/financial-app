const express = require("express");
const app = express();
const DB = require("./database").connectDB;
const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/financial-app", router);


DB();
app.use(express.json());
app.listen(3001, () => {
    console.log("Listening on port 3001")
})