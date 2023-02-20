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

exports.getSingleCategory = async (req, res, next) => {
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
};

exports.newCategory = async(req, res, next) => {
	if(!req.body){
		res.status(400).json({
			success: false,
			message: "Enter the category name"
		})
	}else{
		const categorySelect = await category.findOne(req.body.name)
		if(categorySelect){
			res.status(400).json({
				success: false,
				message: "Category already exist"
			})
		}else{
			await category.create(req.body)
			res.status(200).json({
				success: true,
				message: "Category created successfully"
			})
		}
	}
};

exports.updateCategory = async (req, res, next) => {
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
};

exports.deleteCategory = async (req, res, next) => {
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
};
