// import dbConnect from "../../lib/mongodb";
// import mongoose from "mongoose";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();
//   if (req.method === "OPTIONS") {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   return res.status(200).end();
// }

// res.setHeader("Access-Control-Allow-Origin", "*");


//   await dbConnect();
//   const connection = mongoose.connection.collection("accounts");

//   const { namedata: name, emaildata: email, passworddata: password } = req.body;

//   try {
//     const user = await connection.findOne({ email });

//     if (user) return res.status(200).json({ message: "Email already exists" });

//     await connection.insertOne({ name, email, password, posts: [] });
//     res.status(200).json({ message: "Email is available" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// }

import dbConnect from "../../lib/dbConnect.js";

export default async function handler(req, res) {
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

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
  }
}
