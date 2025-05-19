const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    const filePath = path.join(__dirname, "books.json");
    const data = fs.readFileSync(filePath, "utf8");
    const books = JSON.parse(data);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    res.status(500).json({ error: "Failed to load books data" });
  }
});

app.get("/isbn/:isbn", (req, res) => {
  try {
    const filePath = path.join(__dirname, "books.json");
    const data = fs.readFileSync(filePath, "utf8");
    const books = JSON.parse(data);

    const book = books.find((b) => b.isbn === req.params.isbn);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    res.status(500).json({ error: "Failed to load book" });
  }
});

app.get("/author/:author", (req, res) => {
  try {
    const filePath = path.join(__dirname, "books.json");
    const data = fs.readFileSync(filePath, "utf8");
    const books = JSON.parse(data);

    const book = books.find((b) => b.author === req.params.author);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    res.status(500).json({ error: "Failed to load book" });
  }
});

app.get("/title/:title", (req, res) => {
  try {
    const filePath = path.join(__dirname, "books.json");
    const data = fs.readFileSync(filePath, "utf8");
    const books = JSON.parse(data);

    const book = books.find((b) => b.title === req.params.title);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    res.status(500).json({ error: "Failed to load book" });
  }
});

app.get("/review/:isbn", (req, res) => {
  try {
    const filePath = path.join(__dirname, "books.json");
    const data = fs.readFileSync(filePath, "utf8");
    const books = JSON.parse(data);

    const book = books.find((b) => b.isbn === req.params.isbn);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book.review);
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    res.status(500).json({ error: "Failed to load book" });
  }
});

app.post("/register", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // In real apps: save to DB, hash password, validate uniqueness, etc.
    res
      .status(201)
      .json({ message: `Congratulations ${username}, you are registered!` });
  } catch (error) {
    console.error("Error in registration:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // In real apps: save to DB, hash password, validate uniqueness, etc.
    res.status(201).json({ message: `Log in Successfully as ${username}!` });
  } catch (error) {
    console.error("Error in registration:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/reviewupdate/:isbn", (req, res) => {
  try {
    const isbn = req.params.isbn;
    const reviewText = req.query.review;

    if (!reviewText) {
      return res
        .status(400)
        .json({ error: "Review query parameter is required" });
    }

    const filePath = path.join(__dirname, "books.json");
    const books = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const bookIndex = books.findIndex((book) => book.isbn === isbn);
    if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    books[bookIndex].review = { comment: reviewText };
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));

    res.status(200).json({
      message: `Review updated to "${reviewText}" for ISBN ${isbn} successfully.`,
      isbn,
      review: reviewText,
    });
  } catch (err) {
    console.error("Review update error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/reviewdelete/:isbn", (req, res) => {
  try {
    const isbn = req.params.isbn;

    const filePath = path.join(__dirname, "books.json");
    const books = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const bookIndex = books.findIndex((book) => book.isbn === isbn);
    res.status(200).json({
      message: `Review deleted for ISBN ${isbn} successfully.`,
    });
  } catch (err) {
    console.error("Review update error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Default error handling middleware (optional but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
