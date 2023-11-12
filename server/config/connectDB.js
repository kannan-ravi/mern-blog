import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "mern-auth",
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
