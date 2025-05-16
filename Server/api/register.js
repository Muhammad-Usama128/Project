import { dbConnect, User } from "../lib/mongodb";
import allowCors from "../lib/cors";

async function handler(req, res) {
  await dbConnect();

  const { namedata, emaildata, passworddata } = req.body;

  try {
    const user = await User.findOne({ email: emaildata });

    if (user) {
      return res.status(200).json({ message: "Email already exists" });
    } else {
      await User.create({
        name: namedata,
        email: emaildata,
        password: passworddata,
        posts: [],
      });
      return res.status(200).json({ message: "Email is available" });
    }
  } catch (error) {
    console.error("API /register error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export default allowCors(handler);
