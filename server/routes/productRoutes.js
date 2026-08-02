const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/add", upload.single("image"), addProduct);
router.get("/", getProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
