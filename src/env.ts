import { z } from "zod"
import dotenv from "dotenv"

/**
 * Por algum motivo drizzle não está funcionando com Bun e está usando Node-js,
 * porém não há importação automática de variáveis com Node, talvez seja o OS windows.
 */
dotenv.config({
  path: ".env.local",
})

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
})

export const env = envSchema.parse(process.env)
