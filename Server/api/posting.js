// api/posting.js
import dbConnect from "../../lib/mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();
  const connection = mongoose.connection.collection("accounts");

  const { currentPage, email, category } = req.body;
  const limit = 2;

  try {
    const result = await connection.findOne({ email });

    if (!result || !result.posts) {
      return res.status(200).json({ posts: [], totalPages: 1, totalPosts: 0 });
    }

    const filteredPosts = result.posts.filter(
      (post) => post.category === category
    );

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (currentPage - 1) * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

    res.status(200).json({ posts: paginatedPosts, totalPosts, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
