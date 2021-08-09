const express = require("express");
const petRouter = express.Router();

const {
  postOnePet,
  updateOnePet,
  deleteOnePet,
  getTypes,
  getTypePets,
  findOnePet,
  getAllPets,
} = require("./controller");

petRouter.post("/", postOnePet);
petRouter.patch("/:id", updateOnePet);
petRouter.delete("/:id", deleteOnePet);
petRouter.get("/", getAllPets);
petRouter.get("/types", getTypes);
petRouter.get("/:type", getTypePets);
petRouter.get("/pet/:id", findOnePet);

module.exports = petRouter;

// -- /pets/types that returns a list of pet types in the database
// -- /pets/a-pet-type that returns pets of a specific type ie. dog
// -- /pets/a-pet-type?breed=a-dog-breed that returns pets of a specific type and breed
// -- /pets?microchip=false that returns all pets without a microchip
// -- /pets/a-pet-type?microchip=false that returns pets of a specific type without a microchip
