import postgres from "postgres"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import { drizzle } from "drizzle-orm/postgres-js"
import { env } from "../env"

console.log(env)

const connection = postgres(
  "postgresql://docker:docker@localhost:5432/pizzashop",
  { max: 1 }
)
const db = drizzle(connection)

await migrate(db, { migrationsFolder: "drizzle" })
await connection.end()

process.exit()
