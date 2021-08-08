-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "author" VARCHAR(25) NOT NULL,
    "publicationdate" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "age" INTEGER NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "breed" VARCHAR(50) NOT NULL,
    "microchip" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
