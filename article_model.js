const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  title: "string",
  content: "string",
});
const Article = mongoose.model("Article", articlesSchema);

module.exports = Article;
