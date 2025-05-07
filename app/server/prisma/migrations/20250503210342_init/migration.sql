-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "walletAddress" TEXT NOT NULL,
    "username" TEXT,
    "role" TEXT NOT NULL DEFAULT 'NORMAL_USER',
    "email" TEXT,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "lat" REAL,
    "lng" REAL,
    "reputationScore" REAL NOT NULL DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "jobsCompleted" INTEGER NOT NULL DEFAULT 0,
    "jobsPosted" INTEGER NOT NULL DEFAULT 0,
    "earningsTotal" BIGINT NOT NULL DEFAULT 0,
    "distanceTravelledKm" REAL NOT NULL DEFAULT 0,
    "kycVerified" BOOLEAN NOT NULL DEFAULT false,
    "kycDocumentUrl" TEXT,
    "kycVerifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isBusy" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("avatarUrl", "bio", "createdAt", "distanceTravelledKm", "earningsTotal", "email", "id", "jobsCompleted", "jobsPosted", "kycDocumentUrl", "kycVerified", "kycVerifiedAt", "lat", "lng", "phone", "reputationScore", "reviewsCount", "role", "updatedAt", "username", "walletAddress") SELECT "avatarUrl", "bio", "createdAt", "distanceTravelledKm", "earningsTotal", "email", "id", "jobsCompleted", "jobsPosted", "kycDocumentUrl", "kycVerified", "kycVerifiedAt", "lat", "lng", "phone", "reputationScore", "reviewsCount", "role", "updatedAt", "username", "walletAddress" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
