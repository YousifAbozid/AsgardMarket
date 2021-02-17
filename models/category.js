import mongoose from "mongoose"

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

let Category =
    mongoose.models.categories || mongoose.model("categories", schema)

export default Category
