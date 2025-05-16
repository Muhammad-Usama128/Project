// api/delete.js
import dbConnect from "../../lib/mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();
  const connection = mongoose.connection.collection("accounts");

  const { id, email } = req.body;

  try {
    await connection.updateOne({ email }, { $pull: { posts: { _id: id } } });

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
