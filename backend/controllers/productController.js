const product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require('../middleware/catchAsyncError')

exports.getProduct = async (req, res, next) => {
    const products = await product.find()
    if(!products){
        return next(new ErrorHandler("Product not found", 404))
    }else{
        res.status(200).json({
            Ws: products,
            count: products.length,
            success: true,
            message: "ok"
        })
    }
}

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    const products = await product.findById(req.params.id)
    if(!products){
        return next(new ErrorHandler("Product not found", 404))
    }else{
        res.status(201).json({
            Ws: products,
            success: true,
            message: "ok"
        })
    }
})

exports.newProduct = catchAsyncError(async (req, res, next) => {
    if(!req.body){
        return next(new ErrorHandler("Enter the product details", 400))
	}else{
        const productSelect = await product.findOne({name:req.body.name})
        if(productSelect){
            return next(new ErrorHandler("Product already exist", 400))
		}else{
			await product.create(req.body)
            res.status(200).json({
                success: true,
                message: "Product created successfully"
            })
		}
	}
})

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let products = await product.findById(req.params.id)
    if(!products){
        return next(new ErrorHandler("Product not found", 404))
    }else{
        products = await product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            Ws: products,
            success: true,
            message: "ok"
        })
    }
})

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let products = await product.findById(req.params.id)
    if(!products){
        return next(new ErrorHandler("Product not found", 404))
    }else{
        products = await product.remove();
        res.status(200).json({
            success: true,
            message: "ok"
        })
    }
})
