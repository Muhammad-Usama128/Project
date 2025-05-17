import { dbConnect, User } from "../lib/mongodb";
import allowCors from "../lib/cors";

async function handler(req, res) {
  await dbConnect();
  const { currentPage, email, category } = req.body;
  const limit = 2;

  try {
    const result = await User.findOne({ email });
    
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

export default allowCors(handler);
