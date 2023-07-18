// server.ts
import express, { Request, Response } from "express";
import router from "./routes/userRoutes";
import connectToDatabase from "./connections/Database";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", router);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API!");
});

// Database connection URLs (replace with your database details)
// const databaseUrl2 = 'mongodb://localhost:27017/database2';
const databaseUrl1 =
  "mongodb://mddev:LF0bKggxTV6NNrdoazk1hesSWJ3k2MW3z01lyHR8FvHPKEQolVbenq1oex6ikDrYQ51rCj1XrwKpACDbz6zsxA==@mddev.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mddev@";
// const databaseUrl2 = 'mongodb://localhost:27017/database1';

const connection1 = connectToDatabase(databaseUrl1, "tenant1");
const connection2 = connectToDatabase(databaseUrl1, "tenant2");

// Store the connections in app locals
app.locals.connection1 = connection1;
app.locals.connection2 = connection2;

//   .then(() => {
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// })
// .catch((error) => {
//   console.error('Failed to start the server:', error);
// });
