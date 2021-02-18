import connectDB from "../../../utils/connectDB"
import Product from "../../../models/product"
import auth from "../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "GET":
            await getProducts(request, response)
            break
        case "POST":
            await createProduct(request, response)
            break
    }
}

const getProducts = async (request, response) => {
    try {
        const products = await Product.find()
        response.json({
            status: "Success",
            result: products.length,
            products,
        })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}

const createProduct = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin") {
            return response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

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

        const newProduct = new Product({
            title,
            price,
            inStock,
            description,
            content,
            category,
            images,
        })

        await newProduct.save()

        response.status(201).json({ message: "Created product successfully." })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
