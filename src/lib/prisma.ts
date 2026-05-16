// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
  // 1. Agarramos tu URL segura de Neon
  const connectionString = process.env.DATABASE_URL;
  
  // 2. Creamos el puente de conexión nativo de Postgres
  const pool = new Pool({ connectionString });
  
  // 3. Lo envolvemos con el Adaptador de Prisma
  const adapter = new PrismaPg(pool);
  
  // 4. Prisma 7 feliz: le pasamos el adaptador en el constructor
  return new PrismaClient({ adapter });
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma