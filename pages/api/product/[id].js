import connectDB from "../../../utils/connectDB"
import Product from "../../../models/product"
import auth from "../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "GET":
            await getProduct(request, response)
            break
        case "PUT":
            await updateProduct(request, response)
            break
        case "DELETE":
            await deleteProduct(request, response)
            break
    }
}

const getProduct = async (request, response) => {
    try {
        const { id } = request.query
        const product = await Product.findById(id)
        if (!product) {
            return response
                .status(404)
                .json({ error: "This product doesn't exist." })
        }

        return response.json({ product })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

const updateProduct = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin") {
            return response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

        const { id } = request.query
        const {
            title,
            price,
            inStock,
            description,
            content,
            category,
            images,
        } = request.body
        if (
            !title ||
            !price ||
            !inStock ||
            !description ||
            !content ||
            !category ||
            images.length === 0
        ) {
            return response
                .status(400)
                .json({ error: "Please add all fields." })
        }

        await Product.findByIdAndUpdate(
            { _id: id },
            { title, price, inStock, description, content, category, images }
        )

        return response.json({ message: "Updated product successfully." })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

const deleteProduct = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin") {
            return response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

        const { id } = request.query

        await Product.findByIdAndDelete(id)

        return response.json({ message: "Deleted product successfully." })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
