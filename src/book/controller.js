const prismaDB = require("../database");

async function postOneBook(req, res) {
  const newBook = req.body;

  try {
    // if(newBook.publicationdate.match()) try regex
    //if not convert it to iso 8601
    newBook.publicationdate = new Date(newBook.publicationdate).toISOString();
    const newBookFromServer = await prismaDB.book.create({
      data: newBook,
    });

    res.json(newBookFromServer);
  } catch ({ message }) {
    console.log(message);
    res.json(message);
  }
}

async function getAllBooks(req, res) {
  try {
    const allBooks = await prismaDB.book.findMany();
    res.json(allBooks);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function getTypeBooks(req, res) {
  const bookType = req.params.type;
  const bookTopic = req.query.topic;

  try {
    if (bookTopic === undefined) {
      const allBooks = await req.prismaDB.book.findMany({
        where: {
          type: { equals: bookType, mode: "insensitive" },
        },
      });
      if (allBooks.length === 0) {
        throw "no such type";
      }
      res.json(allBooks);
    } else {
      const allBooks = await prismaDB.book.findMany({
        where: {
          type: { equals: bookType, mode: "insensitive" },
          title: { contains: bookTopic, mode: "insensitive" },
        },
      });
      if (allBooks.length === 0) {
        throw "no such topic";
      }
      res.json(allBooks);
    }
  } catch (error) {
    res.json(error);
  }
}

async function getBooksWithName(req, res) {
  const bookAuthor = req.params.authorname;
  const order = req.query.order;

  if (order) {
    try {
      const allBooks = await prismaDB.book.findMany({
        where: { author: { contains: bookAuthor, mode: "insensitive" } },
        orderBy: {
          publicationdate: "desc",
        },
      });
      if (allBooks.length === 0) {
        throw "no such author";
      }
      res.json(allBooks);
    } catch (error) {
      res.json(error);
    }
  } else {
    try {
      const allBooks = await prismaDB.book.findMany({
        where: { author: { contains: bookAuthor, mode: "insensitive" } },
      });
      if (allBooks.length === 0) {
        res.json("no such author");
      }
      res.json(allBooks);
    } catch (error) {
      res.json(error.message);
    }
  }
}

async function getOneBook(req, res) {
  const bookId = Number(req.params.id);
  try {
    const theBook = await prismaDB.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (theBook.title === undefined) {
      throw "book id is wrong";
    }
    res.json(theBook);
    return theBook;
  } catch (error) {
    res.json(error);
  }
}

async function updateOneBook(req, res) {
  const bookId = Number(req.params.id);

  try {
    let theBook = await prismaDB.book.findUnique({
      where: {
        id: bookId,
      },
    });
    theBook = { ...theBook, ...req.body };
    delete theBook.id;
    const updateBook = await prismaDB.book.update({
      where: {
        id: bookId,
      },
      data: theBook,
    });
    res.json(updateBook);
  } catch (error) {
    console.log("something wrong");
    res.json(error);
  }
}

async function deleteOneBook(req, res) {
  const bookId = Number(req.params.id);

  try {
    const deleteBook = await prismaDB.book.delete({
      where: {
        id: bookId,
      },
    });
    res.json("book is deleted");
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  postOneBook,
  getAllBooks,
  getTypeBooks,
  getBooksWithName,
  updateOneBook,
  deleteOneBook,
  getOneBook,
};
