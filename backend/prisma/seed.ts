import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Backend started, seeding initial data...");
  console.log("Environment value is:", process.env.DATABASE_URL);
  const adminId = "dm";

  const dm = await prisma.player.upsert({
    where: { id: "dm" },
    update: {},
    create: {
      id: adminId,
      name: "Dungeon Master",
      description: "System Administrator",
    },
  });

  console.log(`✅ Sample User Created: ${dm.name}`);

  const campaign = await prisma.campaign.create({
    data: {
      name: "Initial Campaign",
      description: "Campaign created with the initial seed.",
      status: "active",
      dmId: dm.id,
      players: {
        create: {
          playerId: dm.id
        }
      }
    },
  });

  console.log(`✅ Sample Campaign created: ${campaign.name}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
