import express from 'express';
import { Connection } from 'mongoose';
import { UserDocument, UserModel, userSchema } from '../schemas/User';

const router = express.Router();

// Create user API endpoint for connection1
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const connection: Connection = req.app.locals.connection1; // Get connection from app.locals

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
});

export default router;
