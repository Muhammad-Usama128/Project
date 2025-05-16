import { dbConnect, User } from "../lib/mongodb";
import allowCors from "../lib/cors";

async function handler(req, res) {
  await dbConnect();

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

export default allowCors(handler);
