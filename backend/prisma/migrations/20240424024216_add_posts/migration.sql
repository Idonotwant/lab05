-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "accountName" VARCHAR(10) NOT NULL,
    "content" VARCHAR(256) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
