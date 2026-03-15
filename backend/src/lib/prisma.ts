import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const rdsConnectionString = `${process.env.RDS_DATABASE_URL}`; //Todo do once everything works 

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };