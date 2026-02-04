import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log("Usage: node scripts/create-user.mjs email motdepasse");
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 10);

const user = await prisma.user.upsert({
  where: { email },
  update: { passwordHash },
  create: { email, passwordHash, name: "Tao" },
});

console.log("OK user:", user.email);
await prisma.$disconnect();
