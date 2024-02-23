import {
  SECRET_OPENAI_KEY,
  SECRET_USER1_NAME,
  SECRET_USER1_PASS,
  SECRET_USER2_NAME,
  SECRET_USER2_PASS,
} from "$env/static/private";

import { db } from "@vercel/postgres";

export async function seed() {
  const dbclient = await db.connect();

  const userTable = await dbclient.sql`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v5(),
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    key VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`;

  console.log(`Created "users" table`);

  const conversations = await dbclient.sql`CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v5(),
    name VARCHAR(255),
    user_id UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`;

  console.log(`Created "conversations" table`);

  const messages = await dbclient.sql`CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v5(),
    conversation_id UUID NOT NULL,
    message VARCHAR(255),
    response VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
  )`;

  console.log(`Created "messages" table`);

  const users = await Promise.all([
    dbclient.sql`
    INSERT INTO users (name, password, key)
    VALUES (${SECRET_USER1_NAME}, ${SECRET_USER1_PASS}, ${SECRET_OPENAI_KEY})
  `,
    dbclient.sql`
    INSERT INTO users (name, password, key)
    VALUES (${SECRET_USER2_NAME}, ${SECRET_USER2_PASS}, ${SECRET_OPENAI_KEY})
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
