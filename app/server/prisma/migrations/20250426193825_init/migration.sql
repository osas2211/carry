/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "avatar" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_User" ("avatar", "id", "index", "role") SELECT "avatar", "id", "index", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
