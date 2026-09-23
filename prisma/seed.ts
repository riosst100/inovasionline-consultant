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

  // Placeholder — replace with the real founder/team profiles before launch.
  await prisma.programmer.deleteMany();
  await prisma.programmer.createMany({
    data: [
      {
        name: "[FOUNDER NAME]",
        role: "Founder / Full-Stack Engineer",
        skills: "Replace with real specialization, e.g. Next.js, Node.js, PostgreSQL",
        linkedin: "https://linkedin.com/in/[FOUNDER-LINKEDIN]",
        order: 1,
      },
    ],
  });

  // Placeholder case studies — replace with real project details or remove before launch.
  // Use "Confidential Client" style labels if the client cannot be named.
  await prisma.portfolioItem.deleteMany();
  await prisma.portfolioItem.createMany({
    data: [
      {
        title: "[PROJECT TITLE]",
        category: "Custom Web Application",
        description: "[Short one-line summary of the project]",
        clientLabel: "[CLIENT NAME OR: Confidential Client, Location]",
        problem: "[The business problem the client faced before this project]",
        solution: "[What we built to solve it]",
        techStack: "[e.g. Next.js, PostgreSQL, REST API]",
        ourRole: "[e.g. Full-stack development & architecture]",
        challenge: "[The biggest technical or business challenge]",
        outcome: "",
        order: 1,
      },
    ],
  });

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
