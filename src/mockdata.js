const faker = require("faker");
const bookData = [];

const bookType = ["romance", "thriller", "fantasy", "history", "horror"];

function getRandomInt() {
  return Math.floor(Math.random() * 5);
}

for (i = 0; i <= 10; i++) {
  const newBook = {
    title: faker.lorem.words(5),
    type: bookType[getRandomInt()],
    author: faker.name.findName(),
    publicationdate: faker.date.past(10),
  };
  bookData.push(newBook);
}

const petType = ["dog", "piggy", "duck", "cat", "python"];
const breedType = ["yorkshire", "highland", "beijingpud", "kingkong", "ussop"];

const petData = [];
for (i = 0; i <= 10; i++) {
  const newPet = {
    name: faker.name.firstName(),
    age: getRandomInt(),
    type: petType[getRandomInt()],
    breed: breedType[getRandomInt()],
    microchip: i % 2 === 0 ? true : false,
  };
  petData.push(newPet);
}

module.exports = { bookData, petData };
