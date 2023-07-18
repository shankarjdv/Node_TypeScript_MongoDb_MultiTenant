// userController.ts

import { Request, Response } from 'express';
import { createUserService } from '../services/userService';
import { Connection } from 'mongoose';
import { UserDocument, UserModel, userSchema } from '../schemas/User';
// import { getDB } from '../dbConnection';
interface CustomRequest extends Request {
  tokenPayload?: {
    tid?: string;
    userRole?: string[];
    roles?: string[];
  };
}


export const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // console.log("req obj =====================>",req?.tokenPayload?.tid)
    // let tenant = req?.tokenPayload?.tid;

    const tenantIdentifier = "tenant1";//req.headers['x-tenant-id']; // Assuming you pass the tenant identifier in a header

    // Get the dbName based on the tenantIdentifier
    const dbName = getDBNameFromTenantIdentifier(tenantIdentifier);

    // Pass the dbName to the createUserService function
    const createdUser = await createUserService({...userData,createdAt: Date.now()}, dbName);
    res.json(createdUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const createUserController2 = async (req: CustomRequest, res: Response) => {
  try {

    const userData = req.body;
    // console.log("req obj =====================>",req.tokenPayload?.tid)
    let tenant = req?.tokenPayload?.tid ;

    const { name, email } = req.body;
    let connection: Connection = req.app.locals.connection1
    if(tenant == "dc"){
      connection = req.app.locals.connection1; // Get connection from app.locals
    }else{
      connection = req.app.locals.connection1; // Get connection from app.locals
    }

    // Register the User schema if it hasn't been registered
    if (!connection.models.User) {
      connection.model<UserDocument>('User', userSchema);
    }

    const User = connection.model<UserDocument>('User'); // Retrieve the User model from the connection

    const user = new User({ name, email });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};
export const getUsers = async (req: CustomRequest, res: Response) => {
  try {
    const userData = req.body;
    let tenant = req?.tokenPayload?.tid ;
    const { name, email } = req.body;
    let connection: Connection = req.app.locals.connection1
    if(tenant == "dc"){
      connection = req.app.locals.connection1; // Get connection from app.locals
    }else{
      connection = req.app.locals.connection2; // Get connection from app.locals
    }

    // // Register the User schema if it hasn't been registered
    // if (!connection.models.User) {
    //   connection.model<UserDocument>('User', userSchema);
    // }

    const User = connection.model<UserDocument>('User'); // Retrieve the User model from the connection

    const user = new User({ name, email });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Helper function to map tenantIdentifier to dbName
const getDBNameFromTenantIdentifier = (tenantIdentifier: string): string => {
  // Add logic here to map tenantIdentifier to the appropriate dbName
  // For example, you could use a configuration file or database to store this mapping
  // Return the corresponding dbName based on the tenantIdentifier
  return 'tenant1db'; // Replace with your actual logic
};
