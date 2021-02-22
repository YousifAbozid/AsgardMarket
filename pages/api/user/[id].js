import connectDB from "../../../utils/connectDB"
import User from "../../../models/user"
import auth from "../../../middleware/auth"

connectDB()

export default async (request, response) => {
    switch (request.method) {
        case "PATCH":
            await updateRole(request, response)
            break
        case "DELETE":
            await deleteUser(request, response)
            break
    }
}

const updateRole = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin" || !result.root) {
            return response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

        const { id } = request.query
        const { role } = request.body

        await User.findByIdAndUpdate({ _id: id }, { role })

        return response.json({ message: "Updated Successfully." })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}

const deleteUser = async (request, response) => {
    try {
        const result = await auth(request, response)
        if (result.role !== "admin" || !result.root) {
            return response
                .status(401)
                .json({ error: "Unauthorized, you are not an admin." })
        }

        const { id } = request.query

        await User.findByIdAndDelete(id)

        return response.json({ message: "Deleted Successfully." })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
