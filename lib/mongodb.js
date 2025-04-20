import { MongoClient } from "mongodb";

// Connection URI
const uri = process.env.MONGODB_URI;

// Connection options optimized for serverless environments
const options = {
  useUnifiedTopology: true,
  maxPoolSize: 5, // Limit connections for serverless
  minPoolSize: 1, // Keep at least one connection open
  connectTimeoutMS: 10000, // 10 seconds connection timeout
  socketTimeoutMS: 45000, // 45 seconds socket timeout
  serverSelectionTimeoutMS: 10000, // 10 seconds server selection timeout
  heartbeatFrequencyMS: 30000, // Heartbeat to keep connection alive
  retryWrites: true,
  retryReads: true,
  w: "majority" // Write concern for better reliability
};

// Check if MongoDB URI is defined
if (!uri) {
  throw new Error("Please add your MongoDB URI to environment variables");
}

// Cache client connection
let cachedClient = null;
let cachedDb = null;

// Connection function with retry logic
async function connectWithRetry(uri, options, retries = 3, backoff = 1000) {
  try {
    const client = new MongoClient(uri, options);
    return await client.connect();
  } catch (err) {
    if (retries <= 0) {
      console.error('MongoDB connection failed after retries:', err);
      throw err;
    }
    
    console.log(`MongoDB connection attempt failed, retrying in ${backoff}ms...`);
    await new Promise(resolve => setTimeout(resolve, backoff));
    return connectWithRetry(uri, options, retries - 1, backoff * 2);
  }
}

// Export connection promise
export async function connectToDatabase() {
  // If we have cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Connect with retry logic
  const client = await connectWithRetry(uri, options);
  const db = client.db("bitlinks");
  
  // Cache the connection
  cachedClient = client;
  cachedDb = db;
  
  // Create index if it doesn't exist
  try {
    await db.collection("url").createIndex({ shorturl: 1 }, { unique: true });
    console.log("Index created or already exists");
  } catch (error) {
    console.error("Error creating index:", error);
  }
  
  return { client, db };
}

// For backwards compatibility
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = connectWithRetry(uri, options);
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new promise
  clientPromise = connectWithRetry(uri, options);
}

export default clientPromise;