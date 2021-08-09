const { bookData } = require("../mockdata");

async function postOneBook(req, res) {
  const newBook = req.body;
  try {
    const newBookFromServer = await req.prismaDB.book.create({
      data: newBook,
    });
    res.json(newBookFromServer);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function getAllBooks(req, res) {
  try {
    const allBooks = await req.prismaDB.book.findMany();
    res.json(allBooks);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function getTypeBooks(req, res) {
  const bookType = req.params.type;
  const bookTopic = req.query.topic;
  if (bookTopic === undefined) {
    try {
      const allBooks = await req.prismaDB.book.findMany({
        where: {
          type: bookType,
        },
      });
      if (allBooks.length === 0) {
        throw "no such type";
      }
      res.json(allBooks);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  } else {
    try {
      const allBooks = await req.prismaDB.book.findMany({
        where: {
          type: bookType,
          title: { contains: bookTopic },
        },
      });
      if (allBooks.length === 0) {
        throw "no such topic";
      }
      res.json(allBooks);
    } catch (error) {
      res.json(error);
    }
  }
}

async function getBooksWithName(req, res) {
  const bookAuthor = req.params.author;
  const order = req.query.order;

  if (order) {
    try {
      const allBooks = await req.prismaDB.book.findMany({
        where: { author: bookAuthor },
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
      const allBooks = await req.prismaDB.book.findMany({
        where: { author: bookAuthor },
      });
      if (allBooks.length === 0) {
        throw "no such author";
      }
      res.json(allBooks);
    } catch (error) {
      res.json(error);
    }
  }
}

async function getOneBook(req, res) {
  const bookId = Number(req.params.id);
  try {
    const theBook = await req.prismaDB.book.findUnique({
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
    let theBook = await req.prismaDB.book.findUnique({
      where: {
        id: bookId,
      },
    });
    theBook = { ...theBook, ...req.body };
    const updateBook = await req.prismaDB.book.update({
      where: {
        id: bookId,
      },
      data: {
        title: theBook.title,
        type: theBook.type,
        author: theBook.author,
        publicationdate: theBook.publicationdate,
      },
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
    const deleteBook = await req.prismaDB.book.delete({
      where: {
        id: bookId,
      },
    });
    res.json("book is deleted");
    console.log("127", bookId);
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
