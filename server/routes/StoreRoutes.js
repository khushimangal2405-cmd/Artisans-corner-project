const express = require("express");
const router = express.Router();

const { ... } = require("../controllers/StoreController");
router.post("/create", createStore);

router.get("/", getStore);


module.exports = router;