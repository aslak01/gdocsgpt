import {
  SECRET_OPENAI_KEY,
  SECRET_USER1_EMAIL,
  SECRET_USER1_NAME,
  SECRET_USER1_PASS,
  SECRET_USER2_EMAIL,
  SECRET_USER2_NAME,
  SECRET_USER2_PASS,
} from "$env/static/private";

import { sql } from "@vercel/postgres";

export async function seed() {
  const userTable = await sql`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v5(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    key VARCHAR(255) NOT NULL,
    "systemPrompt" VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`;

  console.log(`Created "users" table`);

  const conversations = await sql`CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v5(),
    name VARCHAR(255),
    user_id UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`;

  console.log(`Created "conversations" table`);

  const messages = await sql`CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v5(),
    conversation_id UUID NOT NULL,
    message VARCHAR(255),
    response VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
  )`;

  console.log(`Created "messages" table`);

  const users = await Promise.all([
    sql`
    INSERT INTO users (name, email, image)
    VALUES (${SECRET_USER1_NAME}, ${SECRET_USER1_EMAIL}, ${SECRET_USER1_PASS}, ${SECRET_OPENAI_KEY})
    ON CONFLICT (email) DO NOTHING;
  `,
    sql`
    INSERT INTO users (name, email, image)
    VALUES (${SECRET_USER2_NAME}, ${SECRET_USER2_EMAIL}, ${SECRET_USER2_PASS}, ${SECRET_OPENAI_KEY})
    ON CONFLICT (email) DO NOTHING;
  `,
  ]);

  console.log(`Seeded ${users.length} users in "users" table`);

  return {
    userTable,
    conversations,
    messages,
    users,
  };
}
