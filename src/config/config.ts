// src/config/config.ts

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the configuration object
const config: {
  [key: string]: {
    dbConnectionString: string;
    // Add other configuration properties as needed
  };
} = {
  local: {
    dbConnectionString: process.env.DB_CONNECTION_local || '',
  },
  development: {
    dbConnectionString: process.env.DB_CONNECTION_DEV || '',
  },
  uat: {
    dbConnectionString: process.env.DB_CONNECTION_UAT || '',
  },
  production: {
    dbConnectionString: process.env.DB_CONNECTION_PROD || '',
  },
};

// Get the current environment
const env = process.env.NODE_ENV || 'development';
console.log("env=========>",env)

// Export the appropriate configuration based on the current environment
export default config[env];
