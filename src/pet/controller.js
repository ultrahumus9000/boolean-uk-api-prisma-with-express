const e = require("express");
const db = require("../database");

async function postOnePet(req, res) {
  const newPet = req.body;
  try {
    const result = await db.pet.create({ data: newPet });
    res.json(result);
  } catch ({ message }) {
    res.json(message);
  }
}
async function updateOnePet(req, res) {
  const petId = Number(req.params.id);
  try {
    const findPet = await db.pet.findUnique({
      where: {
        id: petId,
      },
    });
    if (Object.entries(findPet).length === 0) {
      res.json("no such pet");
      return;
    } else {
      const updatePet = { ...findPet, ...req.body };
      console.log(updatePet);
      const result = await db.pet.update({
        where: {
          id: petId,
        },
        data: updatePet,
      });
      res.json(result);
    }
  } catch (error) {
    res.json(error.message);
    console.error(error);
  }
}

async function deleteOnePet(req, res) {
  const petId = Number(req.params.id);
  try {
    await db.pet.delete({
      where: {
        id: petId,
      },
    });
    res.json("pet is deleted");
  } catch (error) {
    res.json(error.message);
  }
}

async function getTypes(req, res) {
  try {
    const result = await db.pet.groupBy({
      by: ["type"],
    });
    res.json(result);
  } catch ({ message }) {
    res.json(message);
  }
}

async function getTypePets(req, res) {
  const petType = req.params.type;
  const breedQuery = req.query.breed;
  let microchip = req.query.microchip;

  microchip = microchip === "true" ? true : false;
  let type = typeof microchip;

  try {
    if (breedQuery) {
      const result = await db.pet.findMany({
        where: {
          type: { equals: petType, mode: "insensitive" },
          breed: { contains: breedQuery, mode: "insensitive" },
        },
      });
      if (result.length === 0) {
        res.json("no such type or breed");
      } else {
        res.json(result);
      }
    } else if (type === "boolean") {
      const result = await db.pet.findMany({
        where: {
          type: { equals: petType, mode: "insensitive" },
          microchip: microchip,
        },
      });
      if (result.length === 0) {
        res.json("no such type");
      } else {
        res.json(result);
      }
    } else {
      const result = await db.pet.findMany({
        where: {
          type: { equals: petType, mode: "insensitive" },
        },
      });
      if (result.length === 0) {
        res.json("no such type");
      } else {
        res.json(result);
      }
    }
  } catch (error) {
    res.json(error.message);
  }
}

async function findOnePet(req, res) {
  const petId = Number(req.params.id);
  console.log(petId);
  try {
    const findPet = await db.pet.findUnique({
      where: {
        id: petId,
      },
    });
    if (Object.entries(findPet).length === 0) {
      res.json("no such type");
    } else {
      res.json(findPet);
    }
  } catch (error) {
    res.json(error.message);
  }
}

async function getAllPets(req, res) {
  let microchip = req.query.microchip;
  microchip = microchip === "true" ? true : false;
  let type = typeof microchip;
  try {
    if (type === "boolean") {
      const result = await db.pet.findMany({ where: { microchip: microchip } });
      res.json(result);
    } else {
      const result = await db.pet.findMany();
      res.json(result);
    }
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = {
  postOnePet,
  updateOnePet,
  deleteOnePet,
  getTypes,
  getTypePets,
  findOnePet,
  getAllPets,
};

// -- /pets?microchip=false that returns all pets without a microchip
