import mongoose from "mongoose";

const connectToDatabase = (
  databaseUrl: string,
  dbName: string
): mongoose.Connection => {
  const connection = mongoose.createConnection(databaseUrl, {
    dbName: dbName,
    connectTimeoutMS: 30000,
  });

  connection.on("connected", () => {
    console.log("Connected to database:", connection.name);
  });

  connection.on("error", (err) => {
    console.error("Failed to connect to database:", connection.name, err);
  });

  return connection;
};

export default connectToDatabase;
