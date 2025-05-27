import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Mongo DB connected Successfully`)

    } catch (err) {
        console.log(`couldnt connect to mongo db`)
    }
}
export default connectDB;