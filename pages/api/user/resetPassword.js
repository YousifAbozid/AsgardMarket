import connectDB from "../../../utils/connectDB"
import User from "../../../models/user"
import auth from "../../../middleware/auth"
import bcrypt from "bcrypt"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "PATCH":
            await resetPassword(request, response)
            break
    }
}

const resetPassword = async (request, response) => {
    try {
        const result = await auth(request, response)
        const { password } = request.body
        const passwordHash = await bcrypt.hash(password, 12)

        await User.findByIdAndUpdate(
            { _id: result.id },
            { password: passwordHash }
        )

        response.json({ message: "Updated Password Successfully." })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
