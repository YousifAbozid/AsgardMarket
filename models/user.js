import mongoose from "mongoose"

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
        },
        root: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/fswd/image/upload/v1609945570/sample.jpg",
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", schema)

export default User

// export default (mongoose.models && mongoose.models.User
//     ? mongoose.models.User
//     : mongoose.model('User', userSchema));
