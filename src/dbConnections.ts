// dbConnection.ts
import { MongoClient, Db } from 'mongodb';

type TenantConnection = {
  dbName: string;
  db: Db;
};

// const url = 'mongodb://localhost:27017';
const url = 'mongodb://mddev:LF0bKggxTV6NNrdoazk1hesSWJ3k2MW3z01lyHR8FvHPKEQolVbenq1oex6ikDrYQ51rCj1XrwKpACDbz6zsxA==@mddev.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mddev@';
const defaultDbName = 'your-default-database';

// Object to store the connections for each tenant
const tenantConnections: Record<string, TenantConnection> = {};


export const getDB = (dbName?: string): Db => {
  console.log("tenantConnections 2==>",tenantConnections)
  const dbIdentifier = dbName || defaultDbName;
  const connection = tenantConnections['tenant2'];

  console.log("connection 3==>",connection)

  if (!connection) {
    throw new Error(`No connection found for database '${dbIdentifier}'. Make sure to establish the connection.`);
  }

  if (!connection.db) {
    throw new Error(`No active database connection found for database '${dbIdentifier}'.`);
  }

  return connection.db;
};

export const connectToDB = async (dbName: string, tenantIdentifier: string) => {
  try {
    if (tenantConnections[tenantIdentifier]) {
      throw new Error(`Connection for tenant '${tenantIdentifier}' already exists.`);
    }

    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);

    tenantConnections[tenantIdentifier] = {
      dbName,
      db,
    };
    console.log("tenantConnections==>",tenantConnections)

    console.log(`Connected to MongoDB for tenant '${tenantIdentifier}' successfully!`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB for tenant '${tenantIdentifier}':`, error);
    process.exit(1);
  }
};
