import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.course.upsert({
    where: { slug: "formation-vente" },
    update: {},
    create: {
      title: "Comprendre pour Vendre",
      slug: "formation-vente",
      description:
        "Formation complète en vente éthique : psychologie, biais cognitifs, storytelling et marketing.",
      price: 7500,
      isPublished: true,
    },
  });

  console.log("✅ Cours principal « formation-vente » créé / vérifié.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
