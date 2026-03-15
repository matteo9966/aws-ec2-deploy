import { prisma } from "../src/lib/prisma";

async function insertMockPhoto() {
  try {
    // Connect to the database
    await prisma.$connect();

    // Insert a mock photo
    const mockPhoto = await prisma.photo.create({
      data: {
        s3Key: "mock-photo.jpg",
        description: "This is a mock photo for testing purposes.",
        
        // Add other fields as per your Photo model
      },
    });

    console.log("Mock photo inserted:", mockPhoto);
  } catch (error) {
    console.error("Error inserting mock photo:", error);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

insertMockPhoto();