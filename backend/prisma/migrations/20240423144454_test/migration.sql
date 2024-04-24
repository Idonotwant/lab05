/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `accountName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passWord` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "accountName" VARCHAR(10) NOT NULL,
ADD COLUMN     "nickName" VARCHAR(10) NOT NULL,
ADD COLUMN     "passWord" VARCHAR(256) NOT NULL,
ADD COLUMN     "pictureId" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("accountName");

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "picture" BYTEA NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);
