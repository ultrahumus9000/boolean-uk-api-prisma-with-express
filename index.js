const express = require("express");
const morgan = require("morgan");

const app = express();
const bookRouter = require("./src/book/router");
const petRouter = require("./src/pet/router");
// Middleware
// 2nd
app.use(morgan("dev"));
// 3rd
app.use(express.json());

//move to the database.js

// app.use((req, res, next) => {
//   req.prismaDB = prismaDB;
//   next();
// });
// Routes
// 4th
app.use("/books", bookRouter);
app.use("/pets", petRouter);
// 5th
app.all("*", (req, res) => {
  res.status(404).json("doesnt exist such route");
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
app.listen(3001, () => {
  console.log("I'm listening...");
});
