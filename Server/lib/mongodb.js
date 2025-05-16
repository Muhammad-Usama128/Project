import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Global cache for Mongoose connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Define User schema (posts is just an array of plain objects)
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  posts: Array, // or posts: [{ type: Object }]
});

// Avoid model overwrite issues in development
const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export { dbConnect, User };
