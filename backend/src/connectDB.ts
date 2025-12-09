import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

/* Create pool of connection to native Postgres */
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);
/* Instance of Prisma using the adapter (modern Prima requires connection to be handled as such) */
export const prisma = new PrismaClient({ adapter });

export const connectDB = async () => {
  try {
    /* En Prisma with adapters handles connections in a 'lazy' manner. We force it to pass a simple check here */
    await prisma.$connect();
    console.log("✅ PostgreSQL Connected (via Prisma Adapter)");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
    process.exit(1);
  }
};
