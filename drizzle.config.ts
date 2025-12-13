import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: "./.env.local",
});

if (typeof process.env.XATA_DATABASE_URL !== "string") {
  throw new Error("set your XATA_DATABASE_URL");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",

  dbCredentials: {
    url: String(process.env.XATA_DATABASE_URL),
  },
});
