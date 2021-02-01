import mongoose from "mongoose"

const connectDB = () => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.log(`Can't connect to MongoDB ${error}`))
}

export default connectDB
