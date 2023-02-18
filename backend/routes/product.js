const router = require('express').Router();
const { getProduct,getSingleProduct, newProduct, updateProduct } = require('../controllers/productController')

router
    .route('/products')
        .get(getProduct)
        .post(newProduct);
router
    .route('/products/:id')
        .get(getSingleProduct)
        .put(updateProduct)

module.exports = router