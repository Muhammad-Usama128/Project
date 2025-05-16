// api/login.js
import dbConnect from "../../lib/mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();
  const connection = mongoose.connection.collection("accounts");

  const { emaildata: email, passworddata: password } = req.body;

  try {
    const user = await connection.findOne({ email, password });

    if (user) {
      res
        .status(200)
        .json({
          name: user.name,
          email: user.email,
          message: "Login Successfully",
        });
    } else {
      res.status(200).json({ message: "No email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
