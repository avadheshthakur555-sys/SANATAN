import { PrismaClient } from '@prisma/client';
import fs from 'fs';

// Dynamically construct absolute path to SQLite file to prevent path resolution bugs on Serverless runtimes
const cwd = process.cwd();
let dbPath = cwd + '/prisma/dev.db';

// In serverless environments, Next.js standalone server runs in a subdirectory (.next/standalone)
// We scan common relative directories to locate the pre-populated database file rather than creating a new empty one
if (!fs.existsSync(dbPath)) {
  const possiblePaths = [
    cwd + '/../../prisma/dev.db',
    cwd + '/../prisma/dev.db',
    '/var/task/prisma/dev.db',
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      dbPath = p;
      break;
    }
  }
}

const dbUrl = 'file:' + dbPath;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
