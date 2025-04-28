-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "avatar" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
