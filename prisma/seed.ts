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

  await prisma.programmer.deleteMany();
  await prisma.programmer.createMany({
    data: [
      {
        name: "Rizky Ramadhan",
        role: "Full-Stack Engineer",
        skills: "Next.js, Node.js, PostgreSQL",
        linkedin: "https://linkedin.com/in/example",
        order: 1,
      },
      {
        name: "Dewi Anggraini",
        role: "Mobile Developer",
        skills: "Flutter, Kotlin, Swift",
        linkedin: "https://linkedin.com/in/example",
        order: 2,
      },
      {
        name: "Fajar Nugroho",
        role: "DevOps Engineer",
        skills: "AWS, Docker, Kubernetes",
        linkedin: "https://linkedin.com/in/example",
        order: 3,
      },
      {
        name: "Nadia Putri",
        role: "UI/UX Designer",
        skills: "Figma, Design System, Research",
        linkedin: "https://linkedin.com/in/example",
        order: 4,
      },
    ],
  });

  await prisma.portfolioItem.deleteMany();
  await prisma.portfolioItem.createMany({
    data: [
      {
        title: "Platform Retail Omnichannel",
        category: "E-Commerce",
        description: "Sistem penjualan terintegrasi untuk 50+ cabang toko ritel.",
        order: 1,
      },
      {
        title: "Migrasi Infrastruktur Perbankan",
        category: "Cloud Migration",
        description: "Migrasi sistem legacy ke cloud dengan downtime nol.",
        order: 2,
      },
      {
        title: "Sistem ERP Manufaktur",
        category: "Custom Software",
        description: "Digitalisasi proses produksi dan rantai pasok end-to-end.",
        order: 3,
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
