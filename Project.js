const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/bookstore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Book = mongoose.model("Book", {
  title: String,
  author: String,
  isbn: String,
  reviews: [{ username: String, review: String }],
});

const User = mongoose.model("User", {
  username: String,
  password: String,
});

// Task 1: Get all books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Task 2: Get book by ISBN
app.get("/books/isbn/:isbn", async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// Task 3: Get books by author
app.get("/books/author/:author", async (req, res) => {
  const books = await Book.find({ author: req.params.author });
  res.json(books);
});

// Task 4: Get books by title
app.get("/books/title/:title", async (req, res) => {
  const books = await Book.find({ title: req.params.title });
  res.json(books);
});

// Task 5: Get book reviews
app.get("/books/reviews/:isbn", async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ reviews: book.reviews });
});

// Task 6: Register a new user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const newUser = new User({ username, password });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

// Task 7: User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful" });
});

// Task 8: Add/Modify a book review
app.post("/books/review/:isbn", async (req, res) => {
  const { username, review } = req.body;
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ message: "Book not found" });

  const existingReview = book.reviews.find((r) => r.username === username);
  if (existingReview) {
    existingReview.review = review;
  } else {
    book.reviews.push({ username, review });
  }
  await book.save();
  res.json({ message: "Review added/updated successfully" });
});

// Task 9: Delete book review added by that particular user
app.delete("/books/review/:isbn", async (req, res) => {
  const { username } = req.body;
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.reviews = book.reviews.filter((r) => r.username !== username);
  await book.save();
  res.json({ message: "Review deleted successfully" });
});

// Task 10: Get all books – Using async callback function
const getAllBooks = async (callback) => {
  try {
    const response = await axios.get("http://localhost:3000/books");
    callback(null, response.data);
  } catch (error) {
    callback(error, null);
  }
};

// Task 11: Search by ISBN – Using Promises
const getBookByISBN = (isbn) => {
  return axios
    .get(`http://localhost:3000/books/isbn/${isbn}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// Task 12: Search by Author
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/books/author/${author}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Task 13: Search by Title
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/books/title/${title}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
app.listen(3000);
