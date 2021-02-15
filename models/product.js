import mongoose from "mongoose"

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        inStock: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

let Product = mongoose.models.product || mongoose.model("product", schema)

export default Product

// export default (mongoose.models && mongoose.models.Product
//     ? mongoose.models.Product
//     : mongoose.model('Product', productSchema));
