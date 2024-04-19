import mongoose from "mongoose";

const connectDB = (URI: string) => {
    return mongoose.connect(URI)
                    .then(() => console.log('Connected to the Database Successfully!'));
}

export default connectDB;