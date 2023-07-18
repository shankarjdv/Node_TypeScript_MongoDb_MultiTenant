// server.ts
import express, { Request, Response } from 'express';
import router from './routes/userRoutes';
import connectToDatabase from './connections/Database';
// import { connectToDB } from './dbConnections';
// import connection1Routes from './routes/connection1Routes';
// import connection2Routes from './routes/connection2Routes';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// // Use the connection1Routes for connection1 API routes
// app.use('/connection1', connection1Routes);
// // Use the connection2Routes for connection2 API routes
// app.use('/connection2', connection2Routes);


// Routes
app.use('/api', router);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API!');
});

// Database connection URLs (replace with your database details)
const databaseUrl1 = 'mongodb://localhost:27017/database1';
const databaseUrl2 = 'mongodb://localhost:27017/database2';

const connection1 = connectToDatabase(databaseUrl1);
const connection2 = connectToDatabase(databaseUrl2);

// Store the connections in app locals
app.locals.connection1 = connection1;
app.locals.connection2 = connection2;



// Connect to MongoDB and start the server
// connectToDB()
// connectToDB('tenant1db', 'tenant1');
// connectToDB('tenant2db', 'tenant2')
//   .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  // })
  // .catch((error) => {
  //   console.error('Failed to start the server:', error);
  // });
