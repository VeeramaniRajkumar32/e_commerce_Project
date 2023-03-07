const router = require('express').Router();
const { verifyToken } = require('../middleware/jwtToken');
const { getCategory, getSingleCategory, newCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')

router
    .route('/category', verifyToken)
        .get(getCategory)
        .post(newCategory);
router
    .route('/category/:id', verifyToken)
        .get(getSingleCategory)
        .put(updateCategory)
        .delete(deleteCategory)

module.exports = router