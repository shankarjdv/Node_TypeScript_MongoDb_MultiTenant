// userService.ts

import { createUser } from '../daos/userDAO';

export const createUserService = async (userData: any, dbName: string) => {
  // Perform any additional business logic
  const createdUser = await createUser(userData, dbName);
  return createdUser;
};

// Add other service functions as needed
