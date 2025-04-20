import { connectToDatabase } from "@/lib/mongodb";

// Set maximum duration for this function
export const config = {
  maxDuration: 60
};

export async function POST(request) {
  try {
    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return Response.json(
        { success: false, error: true, message: "Invalid request format" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.url || !body.shorturl) {
      return Response.json(
        { success: false, error: true, message: "URL and shorturl are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB with improved error handling
    let client, db;
    try {
      console.log("Connecting to MongoDB...");
      const startTime = Date.now();
      
      // Set a longer timeout for the MongoDB connection
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timeout")), 15000)
      );
      
      const connection = await Promise.race([
        connectToDatabase(),
        timeoutPromise
      ]);
      
      client = connection.client;
      db = connection.db;
      
      console.log(`MongoDB connected in ${Date.now() - startTime}ms`);
    } catch (error) {
      console.error("MongoDB connection error:", error);
      return Response.json(
        { 
          success: false, 
          error: true, 
          message: "Database connection failed",
          details: process.env.NODE_ENV === "development" ? error.message : undefined
        },
        { status: 500 }
      );
    }

    // Database operations with error handling and timing
    try {
      console.log("Starting database operations...");
      const startTime = Date.now();
      
      const collection = db.collection("url");

      // Use projection to minimize data transfer
      const doc = await collection.findOne(
        { shorturl: body.shorturl },
        { projection: { _id: 1 } }
      );
      
      console.log(`Find operation completed in ${Date.now() - startTime}ms`);
      
      if (doc) {
        return Response.json({
          success: false,
          error: true,
          message: "URL already exists!",
        });
      }

      // Insert the new URL
      const insertStartTime = Date.now();
      await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl,
        createdAt: new Date(),
      });
      
      console.log(`Insert operation completed in ${Date.now() - insertStartTime}ms`);

      return Response.json({
        success: true,
        error: false,
        message: "URL Generated Successfully",
      });
    } catch (error) {
      console.error("Database operation error:", error);
      return Response.json(
        { success: false, error: true, message: "Database operation failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    // Catch-all error handler
    console.error("Unexpected error in API route:", error);
    return Response.json(
      { success: false, error: true, message: "Server error" },
      { status: 500 }
    );
  }
}