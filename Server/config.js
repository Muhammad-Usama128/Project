const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://usama-123:usama123@restaurent.d5u0foe.mongodb.net/social_media?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

connect
  .then(() => {
    console.log("Connected to Social Media successful");
  })
  .catch((error) => {
    console.log("Connection error dishes");
  });

const accountschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  posts: Array,
});

const accounts = new mongoose.model("accounts", accountschema);
module.exports = accounts;
