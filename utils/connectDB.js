import mongoose from "mongoose"

const connectDB = () => {
    // todo workaround for HMR. It remove old model before added new ones
    Object.keys(mongoose.connection.models).forEach((key) => {
        delete mongoose.connection.models[key]
    })
    // delete mongoose.connection.models['User']

    if (mongoose.connections[0].readyState) {
        console.log("Already connected to MongoDB.")
        return
    }

    mongoose
        .connect(process.env.MONGODB_URL, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to MongoDB."))
        .catch((error) => console.log(`Can't connect to MongoDB ${error}`))
}

export default connectDB
