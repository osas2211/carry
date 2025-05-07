-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "creatorAddress" TEXT NOT NULL,
    "courierAddress" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "reward" BIGINT NOT NULL,
    "metadataHash" TEXT,
    "pickupAddress" TEXT NOT NULL,
    "dropoffAddress" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "eta" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Job_creatorAddress_fkey" FOREIGN KEY ("creatorAddress") REFERENCES "User" ("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_courierAddress_fkey" FOREIGN KEY ("courierAddress") REFERENCES "User" ("walletAddress") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("courierAddress", "createdAt", "creatorAddress", "description", "dropoffAddress", "eta", "id", "isDeleted", "metadataHash", "pickupAddress", "reward", "status", "updatedAt") SELECT "courierAddress", "createdAt", "creatorAddress", "description", "dropoffAddress", "eta", "id", "isDeleted", "metadataHash", "pickupAddress", "reward", "status", "updatedAt" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
CREATE INDEX "Job_creatorAddress_idx" ON "Job"("creatorAddress");
CREATE INDEX "Job_courierAddress_idx" ON "Job"("courierAddress");
CREATE INDEX "Job_status_idx" ON "Job"("status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
