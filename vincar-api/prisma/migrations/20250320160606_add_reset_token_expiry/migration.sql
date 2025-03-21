/*
  Warnings:

  - You are about to alter the column `pickup_latitude` on the `Ride` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `pickup_longitude` on the `Ride` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - A unique constraint covering the columns `[resetToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetTokenExpiry" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "passenger_user_id" TEXT NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "driver_user_id" TEXT,
    "pickup_date" DATETIME NOT NULL,
    "pickup_latitude" REAL NOT NULL,
    "pickup_longitude" REAL NOT NULL,
    "dropoff_address" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'P',
    CONSTRAINT "Ride_passenger_user_id_fkey" FOREIGN KEY ("passenger_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ride_driver_user_id_fkey" FOREIGN KEY ("driver_user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ride" ("driver_user_id", "dropoff_address", "id", "passenger_user_id", "pickup_address", "pickup_date", "pickup_latitude", "pickup_longitude", "status") SELECT "driver_user_id", "dropoff_address", "id", "passenger_user_id", "pickup_address", "pickup_date", "pickup_latitude", "pickup_longitude", "status" FROM "Ride";
DROP TABLE "Ride";
ALTER TABLE "new_Ride" RENAME TO "Ride";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");
