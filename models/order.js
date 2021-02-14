import mongoose from "mongoose"

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        address: String,
        mobile: String,
        cart: Array,
        total: Number,
        delivered: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model("Order", schema)

export default Order
