const express = require("express");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");
const { bookData, petData } = require("./src/mockdata");

const prismaDB = new PrismaClient();
const app = express();
const bookRouter = require("./src/book/router");
const petRouter = require("./src/pet/router");
// Middleware
// 2nd
app.use(morgan("dev"));
// 3rd
app.use(express.json());
app.use((req, res, next) => {
  req.prismaDB = prismaDB;
  next();
});
// Routes
// 4th
app.use("/books", bookRouter);
app.use("/pets", petRouter);
// 5th
app.get("*", (req, res) => {
  res.json({ bookData, petData });
});
// Start the server

// async function createData() {
//   const books = await prismaDB.book.createMany({
//     data: bookData,
//   });

//   const pets = await prismaDB.pet.createMany({
//     data: petData,
//   });
//   return { books, pets };
// }
// createData();

// 1st
app.listen(3000, () => {
  console.log("I'm listening...");
});
