import dbConnect from "../lib/mongodb";
import allowCors from "../lib/cors";

async function handler(req, res) {
  await dbConnect();

  const { namedata, emaildata, passworddata } = req.body;
  try {
    const collection = await getAccountsCollection();
    const user = await collection.findOne({ email: emaildata });

    if (user) {
      return res.status(200).json({ message: "Email already exists" });
    } else {
      await collection.insertOne({
        name: namedata,
        email: emaildata,
        password: passworddata,
        posts: [],
      });
      return res.status(200).json({ message: "Email is available" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
    console.log(error)
  }
}

export default allowCors(handler);
