const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const Article = require("./article_model.js");

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// set the view engine to ejs
app.set("view engine", "ejs");

// Serve images, CSS files, and JavaScript files in a directory named public
app.use(express.static("public"));

// Article plural endpoints
app
  .route("/articles")

  .get((req, res) => {
    Article.find().exec((err, allArticles) => res.send(allArticles));
  })

  .post((req, res) => {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    article.save((err) => {
      if (err) {
        res.send("Unexpected problem occured");
      } else {
        res.send("Successfully registered to database");
      }
    });
  })

  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (err) {
        res.send("Unexpected problem occured");
      } else {
        res.send("Successfully deleted all articles");
      }
    });
  });

// Article singular endpoints
app
  .route("/articles/:title")
  .get((req, res) => {
    Article.findOne({ title: req.params.title }).exec((err, article) => {
      if (err) {
        res.send("Unexpected problem occured");
      } else {
        res.send(article);
      }
    });
  })

  .put((req, res) => {
    Article.updateOne(
      { title: req.params.title },
      { title: req.body.title, content: req.body.content },
      (err) => {
        if (err) {
          res.send("Unexpected problem occured");
        } else {
          res.send("Updated sucessfully");
        }
      }
    );
  })

  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.title },
      { $set: req.body },
      (err) => {
        if (err) {
          res.send("Unexpected problem occured");
        } else {
          res.send("Updated sucessfully");
        }
      }
    );
  })

  .delete((req, res) => {
    Article.deleteOne({ title: req.params.title }, (err) => {
      if (err) {
        res.send("Unexpected problem occured");
      } else {
        res.send("Successfully deleted");
      }
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function main() {
  await mongoose.connect("mongodb://localhost:27017/wikiDB");
}

main().catch((err) => console.log(err));
