import clientPromise from "@/lib/mongodb";

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

    // Connect to MongoDB with timeout
    let client;
    try {
      // Set a timeout for the MongoDB connection
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timeout")), 5000)
      );
      client = await Promise.race([clientPromise, timeoutPromise]);
    } catch (error) {
      console.error("MongoDB connection error:", error);
      return Response.json(
        { success: false, error: true, message: "Database connection failed" },
        { status: 500 }
      );
    }

    // Database operations with error handling
    try {
      const db = client.db("bitlinks");
      const collection = db.collection("url");

      // Check if the short url exists
      const doc = await collection.findOne({ shorturl: body.shorturl });
      if (doc) {
        return Response.json({
          success: false,
          error: true,
          message: "URL already exists!",
        });
      }

      // Insert the new URL
      const result = await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl,
        createdAt: new Date(),
      });

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