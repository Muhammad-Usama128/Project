import { dbConnect, User } from "../lib/mongodb";
import allowCors from "../lib/cors";

async function handler(req, res) {
  await dbConnect();

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

export default allowCors(handler);
