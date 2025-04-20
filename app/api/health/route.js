import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const startTime = Date.now();
    console.log("Health check: Testing MongoDB connection...");
    
    const { client, db } = await connectToDatabase();
    
    // Test the connection with a simple command
    await db.command({ ping: 1 });
    
    console.log(`Health check: MongoDB connected successfully in ${Date.now() - startTime}ms`);
    
    return Response.json({
      status: "ok",
      database: "connected",
      responseTime: `${Date.now() - startTime}ms`
    });
  } catch (error) {
    console.error("Health check: MongoDB connection failed:", error);
    
    return Response.json({
      status: "error",
      message: "Database connection failed",
      error: process.env.NODE_ENV === "development" ? error.message : "Connection error"
    }, { status: 500 });
  }
}