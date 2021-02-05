import connectDB from "../../../utils/connectDB"
import User from "../../../models/user"
import { createAccessToken } from "../../../utils/generateToken"
import jwt from "jsonwebtoken"

connectDB()

export default async (request, response) => {
    try {
        const refreshToken = request.cookies.refreshtoken
        if (!refreshToken) {
            return response.status(400).json({ error: "Please login now!" })
        }

        const result = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        if (!result) {
            return response
                .status(400)
                .json({ error: "Your token is incorrect or has been expired." })
        }

        const user = await User.findById(result.id)
        if (!user) {
            return response.status(400).json({ error: "User does not exist." })
        }

        const accessToken = createAccessToken({ id: user._id })
        response.json({
            accessToken,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                root: user.root,
                avatar: user.avatar,
            },
        })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
