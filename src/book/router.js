const express = require("express");
const bookRouter = express.Router();

const {
  postOneBook,
  getAllBooks,
  getTypeBooks,
  getBooksWithName,
  updateOneBook,
  deleteOneBook,
  getOneBook,
} = require("./controller");

bookRouter.post("/", postOneBook);

bookRouter.get("/", getAllBooks);

bookRouter.get("/bookId/:id", getOneBook);

bookRouter.get("/:type", getTypeBooks);

bookRouter.get("/author/:authorname", getBooksWithName);

bookRouter.patch("/:id", updateOneBook);

bookRouter.delete("/:id", deleteOneBook);

module.exports = bookRouter;

// /books/fiction that returns fiction books
//     -- /books/fiction?topic=a-topic that returns a specific topic of fiction books
//     -- /books/non-fiction that return non-fiction books
//     -- /books/non-fiction?topic=a-topic that returns a specific topic of non-fiction books
//     -- /books/author/name-of-author?order=recent that returns a specific authors' books ordered by publicationDate with the most recent first (use ORDER in your SQL query)
