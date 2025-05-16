// api/update.js
import dbConnect from "../../lib/mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();
  const connection = mongoose.connection.collection("accounts");

  const { title, description, image, email, id } = req.body;

  try {
    await connection.updateOne(
      { email, "posts._id": id },
      {
        $set: {
          "posts.$.Title": title,
          "posts.$.description": description,
          "posts.$.image": image,
        },
      }
    );

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
