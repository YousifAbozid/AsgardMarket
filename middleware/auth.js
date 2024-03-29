import jwt from "jsonwebtoken"
import User from "../models/user"

const auth = async (requset, response) => {
    const token = requset.headers.authorization
    if (!token) {
        return response.status(401).json({ error: "Unauthorized." })
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!decoded) {
        return response.status(401).json({ error: "Invalid token." })
    }

    const user = await User.findOne({ _id: decoded.id })
    return { id: user._id, role: user.role, root: user.root }
}

export default auth
