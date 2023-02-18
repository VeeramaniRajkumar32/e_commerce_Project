const router = require('express').Router();
const { newCategory } = require('../controllers/categoryController')

router
    .route('/category')
        .post(newCategory)

module.exports = router