import connectDB from "../../../../utils/connectDB"
import Order from "../../../../models/order"
import auth from "../../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "PATCH":
            await deliveredOrder(request, response)
            break
    }
}

const deliveredOrder = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin") {
            response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }
        const { id } = request.query

        const order = await Order.findOne({ _id: id })
        if (order.paid) {
            await Order.findByIdAndUpdate({ _id: id }, { delivered: true })
            response.json({
                message: "Delivered Successfully.",
                result: {
                    delivered: true,
                    paid: true,
                    dateOfPayment: order.dateOfPayment,
                    method: order.method,
                },
            })
        } else {
            await Order.findByIdAndUpdate(
                { _id: id },
                {
                    delivered: true,
                    paid: true,
                    dateOfPayment: new Date().toISOString(),
                    method: "Cash",
                }
            )
            response.json({
                message: "Paid in cash and delivered successfully.",
                result: {
                    delivered: true,
                    paid: true,
                    dateOfPayment: new Date().toISOString(),
                    method: "Cash",
                },
            })
        }
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
