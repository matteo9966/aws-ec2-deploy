-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "height" INTEGER,
    "width" INTEGER,
    "fileSize" INTEGER,
    "s3Key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);
