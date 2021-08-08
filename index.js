const express = require("express");
const morgan = require("morgan");

const app = express();

// Middleware
// 2nd
app.use(morgan("dev"));
// 3rd
app.use(express.json());

// Routes
// 4th

// 5th
app.get("*", (req, res) => {
  res.json({ msg: "Im ok..." });
});
// Start the server

// 1st
app.listen(3000, () => {
  console.log("I'm listening...");
});
