import connectDB from "../../../utils/connectDB"
import User from "../../../models/user"
import auth from "../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "PATCH":
            await uploadInfo(request, response)
            break
        case "GET":
            await getUsers(request, response)
            break
    }
}

const getUsers = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin") {
            return response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

        const users = await User.find().select("-password")
        response.json({ users })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}

const uploadInfo = async (request, response) => {
    try {
        const result = await auth(request, response)
        const { name, avatar } = request.body

        const updatedUser = await User.findByIdAndUpdate(
            { _id: result.id },
            { name, avatar }
        )

        response.json({
            message: "Updated Profile Successfully.",
            user: {
                name,
                avatar,
                email: updatedUser.email,
                role: updatedUser.role,
            },
        })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
