import mongoose from "mongoose"

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        address: String,
        mobile: String,
        cart: Array,
        total: Number,
        paymentId: String,
        method: String,
        delivered: {
            type: Boolean,
            default: false,
        },
        paid: {
            type: Boolean,
            default: false,
        },
        dateOfPayment: Date,
    },
    {
        timestamps: true,
    }
)

let Order = mongoose.models.order || mongoose.model("order", schema)

export default Order
