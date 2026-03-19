import { PrismaClient } from '@prisma/client'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined. Check your environment variables.')
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

// Toujours conserver le singleton global — en production comme en dev.
// Sans ça, chaque invocation Vercel (warm lambda) crée un nouveau PrismaClient
// et épuise le pool de connexions Supabase (max 20 sur plan gratuit).
globalForPrisma.prisma = prisma
