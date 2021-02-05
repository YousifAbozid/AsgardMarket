import connectDB from "../../../utils/connectDB"
import Product from "../../../models/product"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "GET":
            await getProducts(request, response)
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
