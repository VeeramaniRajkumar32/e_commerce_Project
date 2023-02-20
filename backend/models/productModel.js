const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter the product description"],
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    seller: {
        type: String,
        required: [true, "Please enter the product seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter the product stack"],
        maxLength: [20, "Product stack cannot exceed"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            ratings: {
                type: String,
                required: true
            },
            Comment: {
                type: String,
                required: true
            }
        }
    ],
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
}
)

module.exports = mongoose.model('product', productSchema)