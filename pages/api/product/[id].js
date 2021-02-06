import connectDB from "../../../utils/connectDB"
import Product from "../../../models/product"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "GET":
            await getProduct(request, response)
            break
    }
}

const getProduct = async (request, response) => {
    try {
        const { id } = request.query
        const product = await Product.findById(id)
        if (!product) {
            response.status(404).json({ error: "This product doesn't exist." })
        }
        response.json({ product })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
