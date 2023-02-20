const router = require('express').Router();
const { getCategory, getSingleCategory, newCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')

router
    .route('/category')
        .get(getCategory)
        .post(newCategory);
router
    .route('/category/:id')
        .get(getSingleCategory)
        .put(updateCategory)
        .delete(deleteCategory)

module.exports = router