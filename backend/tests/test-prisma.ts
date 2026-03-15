import { prisma } from "../src/lib/prisma";

async function testPrismaConnection() {
  try {
    // Test the connection
    await prisma.$connect();
    console.log("Prisma connected successfully.");

    // Check if the 'Photo' table exists
    const result = await prisma.$queryRaw<
      Array<{ table_name: string }>
    >`SELECT table_name FROM information_schema.tables WHERE table_name = 'Photo'`;

    if (result.length > 0) {
      console.log("The 'Photo' table exists.");
    } else {
      console.log("The 'Photo' table does not exist.");
    }
  } catch (error) {
    console.error("Error testing Prisma connection:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrismaConnection();