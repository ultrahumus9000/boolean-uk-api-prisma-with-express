const { PrismaClient } = require("@prisma/client");

const prismaDB = new PrismaClient();

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

const petData = [];
for (i = 0; i <= 10; i++) {
  const newPet = {
    name: faker.name.firstName(),
    age: getRandomInt(),
    type: petType[getRandomInt()],
    breed: faker.animal.dog(),
    microchip: i % 2 === 0 ? true : false,
  };
  petData.push(newPet);
}

async function main() {
  await prismaDB.book.createMany({ data: bookData });
  await prismaDB.pet.createMany({ data: petType });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
