import moongose from "mongoose";

const connectDB = (URI: string) => {
    return moongose.connect(URI)
                    .then(() => console.log('Connected to the Database Successfully!'));
}

export default connectDB;