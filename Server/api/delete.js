import { dbConnect, User } from "../lib/mongodb";
import allowCors from "../lib/cors";

async function handler(req, res) {
  await dbConnect();
  const { id, email } = req.body;

  try {
    await User.updateOne({ email }, { $pull: { posts: { _id: id } } });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export default allowCors(handler);
