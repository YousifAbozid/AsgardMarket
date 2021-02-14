import connectDB from "../../../utils/connectDB"
import Product from "../../../models/product"
import Order from "../../../models/order"
import auth from "../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "POST":
            await createOrder(request, response)
            break
    }
}

const createOrder = async (request, response) => {
    try {
        const result = await auth(request, response)
        const { address, mobile, cart, total } = request.body

        const newOrder = new Order({
            user: result.id,
            address,
            mobile,
            cart,
            total,
        })

        response.status(201).json({ newOrder })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
