import connectDB from "../../../utils/connectDB"
import Category from "../../../models/category"
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

        await Category.findByIdAndUpdate({ _id: id }, { name })

        response.json({ message: "Updated category successfully." })
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

        await Category.findByIdAndDelete(id)

        response.json({ message: "Deleted category successfully." })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
