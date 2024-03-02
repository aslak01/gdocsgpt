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

// Vercel seed function:
// async function seed() {
//   const createTable = await sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       image VARCHAR(255),
//       "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     );
//     `
//
//   console.log(`Created "users" table`)
//
//   const users = await Promise.all([
//     sql`
//           INSERT INTO users (name, email, image)
//           VALUES ('Guillermo Rauch', 'rauchg@vercel.com', 'https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg')
//           ON CONFLICT (email) DO NOTHING;
//       `,
//     sql`
//           INSERT INTO users (name, email, image)
//           VALUES ('Lee Robinson', 'lee@vercel.com', 'https://images.ctfassets.net/e5382hct74si/4BtM41PDNrx4z1ml643tdc/7aa88bdde8b5b7809174ea5b764c80fa/adWRdqQ6_400x400.jpg')
//           ON CONFLICT (email) DO NOTHING;
//       `,
//     sql`
//           INSERT INTO users (name, email, image)
//           VALUES ('Steven Tey', 'stey@vercel.com', 'https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg')
//           ON CONFLICT (email) DO NOTHING;
//       `,
//   ])
//   console.log(`Seeded ${users.length} users`)
//
//   return {
//     createTable,
//     users,
//   }
// }
