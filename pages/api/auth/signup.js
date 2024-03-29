import connectDB from "../../../utils/connectDB"
import valid from "../../../utils/valid"
import User from "../../../models/user"
import bcrypt from "bcrypt"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "POST":
            await signup(request, response)
            break
    }
}

const signup = async (request, response) => {
    try {
        const { name, email, password, cfPassword } = request.body
        const errorMessage = valid(name, email, password, cfPassword)
        if (errorMessage) {
            return response.status(400).json({ error: errorMessage })
        }

        const user = await User.findOne({ email })
        if (user) {
            return response
                .status(400)
                .json({ error: "This email is already exist." })
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new User({
            name,
            email,
            password: passwordHash,
            cfPassword,
        })

        await newUser.save()

        return response
            .status(201)
            .json({ message: "Signed up successfully, Login now!" })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
