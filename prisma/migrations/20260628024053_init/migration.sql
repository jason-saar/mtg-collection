-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "setName" TEXT NOT NULL,
    "setCode" TEXT NOT NULL,
    "collectorNum" TEXT NOT NULL,
    "manaCost" TEXT NOT NULL,
    "cmc" REAL NOT NULL,
    "power" TEXT,
    "toughness" TEXT,
    "colors" TEXT,
    "colorIdentity" TEXT NOT NULL,
    "typeLine" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "prices" TEXT NOT NULL,
    "keywords" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CollectionEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cardId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "CollectionEntry_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
