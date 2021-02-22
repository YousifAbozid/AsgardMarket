import connectDB from "../../../utils/connectDB"
import User from "../../../models/user"
import bcrypt from "bcrypt"
import {
    createAccessToken,
    createRefreshToken,
} from "../../../utils/generateToken"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "POST":
            await login(request, response)
            break
    }
}

const login = async (request, response) => {
    try {
        const { email, password } = request.body

        const user = await User.findOne({ email })
        if (!user) {
            return response
                .status(400)
                .json({ error: "This user doesn't exist." })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return response.status(400).json({ error: "Incorrect password." })
        }

        const accessToken = createAccessToken({ id: user._id })
        const refreshToken = createRefreshToken({ id: user._id })

        return response.json({
            message: "Logged In Successfully.",
            accessToken,
            refreshToken,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                root: user.root,
                avatar: user.avatar,
            },
        })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
