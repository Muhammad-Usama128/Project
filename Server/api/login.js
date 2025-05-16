import { dbConnect, User } from "../lib/mongodb";
import allowCors from "../lib/cors";

async function handler(req, res) {
   await dbConnect();
  const { emaildata, passworddata } = req.body;

  try {
    const user = await User.findOne({ email: emaildata, password: passworddata });

    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        message: "Login Successfully",
      });
    } else {
      res.status(200).json({ message: "No email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export default allowCors(handler);

