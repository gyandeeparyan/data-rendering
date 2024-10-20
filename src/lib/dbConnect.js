import mongoose from "mongoose";



const connection = {};

async function dbConnect(){
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default dbConnect;
