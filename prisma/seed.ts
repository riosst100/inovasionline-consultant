import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin12345", 10);
  await prisma.user.upsert({
    where: { email: "admin@inovasionline.id" },
    update: {},
    create: {
      name: "Admin Inovasi Online",
      email: "admin@inovasionline.id",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const demoPassword = await bcrypt.hash("client12345", 10);
  await prisma.user.upsert({
    where: { email: "client@demo.com" },
    update: {},
    create: {
      name: "Budi Santoso",
      email: "client@demo.com",
      password: demoPassword,
      role: "USER",
      company: "RetailPlus",
      phone: "081234567890",
    },
  });

  // Team section is currently removed from the landing page, and the portfolio
  // section auto-hides when empty. Add real entries via /admin/team and
  // /admin/portfolio when ready — do not seed placeholder content here.
  await prisma.programmer.deleteMany();
  await prisma.portfolioItem.deleteMany();

  console.log("Seed selesai.");
  console.log("Admin login: admin@inovasionline.id / admin12345");
  console.log("Client demo login: client@demo.com / client12345");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
