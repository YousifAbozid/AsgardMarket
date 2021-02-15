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
        case "GET":
            await getOrders(request, response)
            break
    }
}

const getOrders = async (request, response) => {
    try {
        const result = await auth(request, response)
        let orders
        if (result.role !== "admin") {
            orders = await Order.find({ user: result.id }).populate(
                "user",
                "-password"
            )
        } else {
            orders = await Order.find().populate("user", "-password")
        }

        response.json({ orders })
    } catch (error) {
        return response.status(500).json({ error: error.message })
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

        cart.filter((item) => {
            return sold(item._id, item.quantity, item.inStock, item.sold)
        })

        await newOrder.save()
        response.status(201).json({
            message:
                "Payment Successfull, We will contact you to confirm the order soon.",
            newOrder,
        })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

const sold = async (id, quantity, oldInStock, oldSold) => {
    await Product.findByIdAndUpdate(
        { _id: id },
        {
            inStock: oldInStock - quantity,
            sold: oldSold + quantity,
        }
    )
}
