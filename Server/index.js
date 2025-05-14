const express = require("express");
const connection = require("./config");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this is your message!");
});

app.post("/register", async (req, res) => {
  const name = req.body.namedata;
  const email = req.body.emaildata;
  const password = req.body.passworddata;
  try {
    const user = await connection.findOne({ email: email });

    if (user) {
      res.status(200).json({ message: "Email already exists" });
    } else {
      res.status(200).json({ message: "Email is available" });
      const result = await connection.create({
        name: name,
        email: email,
        password: password,
        posts: [],
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.emaildata;
  const password = req.body.passworddata;
  try {
    const user = await connection.findOne({ email: email, password: password });

    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        message: "Login Sucessfully",
      });
    } else {
      res.status(200).json({ message: "No email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/post", async (req, res) => {
  const { title, description, image, email, category } = req.body;
  const data = {
    _id: Math.random().toString(36).substring(2, 10),
    category: category,
    title: title,
    description: description,
    image: image,
  };

  try {
    const user = await connection.updateOne(
      { email: email },
      {
        $push: {
          posts: {
            $each: [data],
            $position: 0,
          },
        },
      }
    );

    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        message: "Posted Sucessfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/update", async (req, res) => {
  const { title, description, image, email, id } = req.body;

  try {
    const user = await connection.updateOne(
      { email: email, "posts._id": id },
      {
        $set: {
          "posts.$.Title": title,
          "posts.$.description": description,
          "posts.$.image": image,
        },
      }
    );

    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        message: "Updated Sucessfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/delete", async (req, res) => {
  const { id, email } = req.body;

  try {
    const user = await connection.updateOne(
      { email: email },
      { $pull: { posts: { _id: id } } }
    );

    if (user) {
      res.status(200).json({
        message: "Deleted Sucessfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
});

app.post("/posting", async (req, res) => {
  const { currentPage, email, category } = req.body;
  let limit = 2;
  try {
    // Run both count and paged posts in one aggregation
    const result = await connection.findOne({ email });

    if (!result || !result.posts) {
      res.status(200).json({
        posts: [],
        totalPages: 1,
        totalPosts: 0,
      });
    } else {
      // Step 1: Filter posts by category
      const filteredPosts = result.posts.filter(
        (post) => post.category === category
      );

      // Step 2: Paginate the filtered posts
      const totalPosts = filteredPosts.length;
      const totalPages = Math.ceil(totalPosts / limit);
      const startIndex = (currentPage - 1) * limit;
      const paginatedPosts = filteredPosts.slice(
        startIndex,
        startIndex + limit
      );

      res.status(200).json({
        posts: paginatedPosts,
        totalPosts,
        totalPages,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports.handler = serverless(app);
