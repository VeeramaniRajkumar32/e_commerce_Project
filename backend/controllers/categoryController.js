const catchAsyncError = require("../middleware/catchAsyncError");
const category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");

exports.getCategory = async (req, res, next) => {
 const categories = await category.find();
	if(!categories){
		return next(new ErrorHandler("Category not found", 404))
	}else{
		res.status(200).json({
			Ws: categories,
			count: categories.length,
			success: true,
			message: "ok"
		})
	}
};

exports.getSingleCategory = catchAsyncError(async (req, res, next) => {
	const categories = await category.findById(req.params.id)
	if(!categories){
		return next(new ErrorHandler("Category not found", 404))
	}else{
		res.status(201).json({
			Ws: categories,
			success: true,
			message: "ok"
		})
	}
})

exports.newCategory = catchAsyncError(async (req, res, next) => {
	const name = req.body.name
	if(!name){
		return next(new ErrorHandler("Enter the category name", 400))
	}else{
		let categoryFind = await category.findOne({name})
		if(categoryFind){
			return next(new ErrorHandler("Category already exist", 400))
		}else{
			await category.create(req.body)
			res.status(200).json({
				success: true,
				message: "Category created successfully"
			})
		}
	}
})

exports.updateCategory = catchAsyncError(async (req, res, next) => {
	let categories = await category.findById(req.params.id);
	if(!categories){
		return next(new ErrorHandler("Category not found", 404))
	}else{
		categories = await category.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})
		res.status(200).json({
			Ws: categories,
			success: true,
			message: "ok"
		})
	}
})

exports.deleteCategory = catchAsyncError(async (req, res, next) => {
	const categories = await category.findById(req.params.id)
    if(!categories){
		return next(new ErrorHandler("Category not found", 404))
    }else{
        await category.remove();
        res.status(200).json({
            success: true,
            message: "ok"
        })
    }
})
