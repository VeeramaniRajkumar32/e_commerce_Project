const product = require("../models/productModel");

exports.getProduct = async (req, res, next) => {
    const products = await product.find()
    if(!products){
        res.status(404).json({
            success: false,
            message: "No products found"
        })
    }else{
        res.status(200).json({
            Ws: products,
            count: products.length,
            success: true,
            message: "ok"
        })
    }
}

exports.getSingleProduct = async (req, res, next) => {
    const products = await product.findById(req.params.id)
    if(!products){
        res.status(404).json({
            success: false,
            message: "No products found"
        })
    }else{
        res.status(201).json({
            Ws: products,
            success: true,
            message: "ok"
        })
    }
}

exports.newProduct = async (req, res, next) => {
    if(!req.body){
        res.status(200).json({
            success: false,
			message: "Enter the product details"
		})
	}else{
        const productSelect = await product.findOne({name:req.body.name})
        if(productSelect){
			res.status(404).json({
				success: false,
				message: "Product already exist"
			})
		}else{
			await product.create(req.body)
            res.status(200).json({
                success: true,
                message: "Product created successfully"
            })
		}
	}
}

exports.updateProduct = async (req, res, next) => {
    let products = await product.findById(req.params.id)
    if(!products){
        res.status(404).json({
            success: false,
            message: "No products found"
        })
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
}

exports.deleteProduct = async (req, res, next) => {
    let products = await product.findById(req.params.id)
    if(!products){
        res.status(404).json({
            success: false,
            message: "No products found"
        })
    }else{
        products = await product.remove();
        res.status(200).json({
            Ws: products,
            success: true,
            message: "ok"
        })
    }
}
