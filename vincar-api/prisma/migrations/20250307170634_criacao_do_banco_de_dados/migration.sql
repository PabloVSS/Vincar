-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "passenger_user_id" TEXT NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "driver_user_id" TEXT,
    "pickup_date" DATETIME NOT NULL,
    "pickup_latitude" TEXT NOT NULL,
    "pickup_longitude" TEXT NOT NULL,
    "dropoff_address" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'P',
    CONSTRAINT "Ride_passenger_user_id_fkey" FOREIGN KEY ("passenger_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ride_driver_user_id_fkey" FOREIGN KEY ("driver_user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
