const router = require('express').Router();
const { getProduct,getSingleProduct, newProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router
    .route('/products')
        .get(getProduct)
        .post(newProduct);
router
    .route('/products/:id')
        .get(getSingleProduct)
        .put(updateProduct)
        .delete(deleteProduct)

module.exports = router