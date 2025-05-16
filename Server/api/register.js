import dbConnect from "../../lib/mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();
  const connection = mongoose.connection.collection("accounts");

  const { namedata: name, emaildata: email, passworddata: password } = req.body;

  try {
    const user = await connection.findOne({ email });

    if (user) return res.status(200).json({ message: "Email already exists" });

    await connection.insertOne({ name, email, password, posts: [] });
    res.status(200).json({ message: "Email is available" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
}
