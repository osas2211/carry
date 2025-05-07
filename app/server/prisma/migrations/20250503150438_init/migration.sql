-- CreateTable
CREATE TABLE "Job" (
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
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Job_creatorAddress_fkey" FOREIGN KEY ("creatorAddress") REFERENCES "User" ("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_courierAddress_fkey" FOREIGN KEY ("courierAddress") REFERENCES "User" ("walletAddress") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrackingUpdate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobId" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TrackingUpdate_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Job_creatorAddress_idx" ON "Job"("creatorAddress");

-- CreateIndex
CREATE INDEX "Job_courierAddress_idx" ON "Job"("courierAddress");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");
