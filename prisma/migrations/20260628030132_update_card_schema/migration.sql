-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUri" TEXT,
    "setName" TEXT NOT NULL,
    "setCode" TEXT NOT NULL,
    "collectorNum" TEXT NOT NULL,
    "manaCost" TEXT,
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
INSERT INTO "new_Card" ("cmc", "collectorNum", "colorIdentity", "colors", "id", "keywords", "manaCost", "name", "power", "prices", "rarity", "setCode", "setName", "toughness", "typeLine") SELECT "cmc", "collectorNum", "colorIdentity", "colors", "id", "keywords", "manaCost", "name", "power", "prices", "rarity", "setCode", "setName", "toughness", "typeLine" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
