import dbConnect from "../lib/mongodb";
export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Email already exists" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
