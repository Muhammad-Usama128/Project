// api/post.js
import dbConnect from "../../lib/mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();
  const connection = mongoose.connection.collection("accounts");

  const { title, description, image, email, category } = req.body;
  const post = {
    _id: Math.random().toString(36).substring(2, 10),
    category,
    title,
    description,
    image,
  };

  try {
    await connection.updateOne(
      { email },
      { $push: { posts: { $each: [post], $position: 0 } } }
    );
    res.status(200).json({ message: "Posted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
