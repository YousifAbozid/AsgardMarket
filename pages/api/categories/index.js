import connectDB from "../../../utils/connectDB"
import Category from "../../../models/category"
import auth from "../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "POST":
            await createCategory(request, response)
            break
        case "GET":
            await getCategories(request, response)
            break
    }
}

const createCategory = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin") {
            return response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

        const { name } = request.body
        if (!name) {
            return response.status(400).json({ error: "Name Can't be empty." })
        }

        const newCategory = new Category({ name })

        await newCategory.save()

        return response.status(201).json({
            message: "Created category successfully.",
            newCategory,
        })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

const getCategories = async (request, response) => {
    try {
        const categories = await Category.find()

        return response.json({ categories })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
