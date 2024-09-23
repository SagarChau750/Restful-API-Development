const express = require("express")
const router = express.Router();

const {insertProduct, getProduct} = require('../controllers/Products')

router.route("/addProduct").post(insertProduct);
router.route("/getData").get(getProduct);

module.exports = router;