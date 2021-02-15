import connectDB from "../../../../utils/connectDB"
import Order from "../../../../models/order"
import auth from "../../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "PATCH":
            await paymentOrder(request, response)
            break
    }
}

const paymentOrder = async (request, response) => {
    try {
        const result = await auth(request, response)
        const { id } = request.query
        const { paymentId } = request.body

        await Order.findByIdAndUpdate(
            { _id: id },
            {
                paid: true,
                paymentId,
                method: "Paypal",
                dateOfPayment: new Date().toISOString(),
            }
        )

        response.json({ message: "Payment Successfull." })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
