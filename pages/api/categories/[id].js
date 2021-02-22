import connectDB from "../../../utils/connectDB"
import Category from "../../../models/category"
import Product from "../../../models/product"
import auth from "../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "PUT":
            await updateCategory(request, response)
            break
        case "DELETE":
            await deleteCategory(request, response)
            break
    }
}

const updateCategory = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin") {
            response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

        const { id } = request.query
        const { name } = request.body

        const updatedCategory = await Category.findByIdAndUpdate(
            { _id: id },
            { name }
        )

        response.json({
            message: "Updated category successfully.",
            category: {
                ...updatedCategory._doc,
                name,
            },
        })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}

const deleteCategory = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin") {
            response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

        const { id } = request.query
        const products = await Product.find({ category: id })

        if (products.length !== 0) {
            return response.status(400).json({
                error:
                    "Sorry, we can't do that, you should delete the products that related to this category first.",
            })
        }

        await Category.findByIdAndDelete(id)

        response.json({ message: "Deleted category successfully." })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
