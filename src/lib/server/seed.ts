import {
  SECRET_OPENAI_KEY,
  SECRET_USER1_EMAIL,
  SECRET_USER1_NAME,
  SECRET_USER2_EMAIL,
  SECRET_USER2_NAME,
} from "$env/static/private";

import { sql } from "@vercel/postgres";

export async function seed() {
  const userTable = await sql`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    key VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`;

  console.log(`Created "users" table`);

  const users = await Promise.all([
    sql`
    INSERT INTO users (name, email, image)
    VALUES (${SECRET_USER1_NAME}, ${SECRET_USER1_EMAIL}, ${SECRET_OPENAI_KEY})
    ON CONFLICT (email) DO NOTHING;
  `,
    sql`
    INSERT INTO users (name, email, image)
    VALUES (${SECRET_USER2_NAME}, ${SECRET_USER2_EMAIL}, ${SECRET_OPENAI_KEY})
    ON CONFLICT (email) DO NOTHING;
  `,
  ]);

  console.log(`Seeded ${users.length} users`);

  return {
    userTable,
    users,
  };
}
