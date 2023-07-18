import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  // Add more fields as needed
}

export const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Define additional fields
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema); // Export the model

export default userSchema; // Export the schema
