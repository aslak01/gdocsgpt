import type { Answer, Conversation } from "$lib/types";
// import { db as pdb } from "@vercel/postgres";
import { seed } from "./seed";
import { extractError } from "$lib/utils/utils";

export type DatabaseUser = {
  id: string;
  username: string;
  password: string;
};

import { createPool, sql } from "@vercel/postgres";
import { POSTGRES_URL } from "$env/static/private";

export async function load() {
  const db = createPool({ connectionString: POSTGRES_URL });
  const startTime = Date.now();

  try {
    const { rows: users } = await db.query("SELECT * FROM users");
    const duration = Date.now() - startTime;
    return {
      users: users,
      duration: duration,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === `relation "users" does not exist`
    ) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now...",
      );
      // Table is not created yet
      await seed();
      const { rows: users } = await db.query("SELECT * FROM users");
      const duration = Date.now() - startTime;
      return {
        users: users,
        duration: duration,
      };
    } else {
      throw error;
    }
  }
}

// const client = await pdb.connect();
export const db = new Map();

// async function hasUsers() {
//   const users = await client.sql`SELECT * FROM users;`;
//   return !!users.rows.length;
// }

export function getUser(userid: string) {
  const user = db.get(userid);
  if (!user) {
    createUser(userid);
  }
  return db.get(userid);
}

export function createUser(userid: string) {
  db.set(userid, []);
}

export function getConversations(userid: string) {
  const user = db.get(userid);
  if (!user) {
    return;
  }
  return db.get(userid);
}

export function getConversation(userid: string, conversationid: string) {
  console.log("hei fra getConversation");
  const user = db.get(userid);
  console.log(user);
  if (!user) {
    return;
  }
  const conversation = user.find((conversation: Conversation) =>
    conversation.id === conversationid
  );
  console.log("getConversation", conversation);
  return conversation;
}

export function createConversation(userid: string) {
  const user = db.get(userid);
  if (!user) return;
  const emptyConversation = { id: crypto.randomUUID(), answers: [] };
  const conversations = user.push(emptyConversation);
  return conversations;
}

export function createAnswer(
  userid: string,
  conversationid: string,
  answer: Omit<Answer, "id">,
) {
  console.log("hei from createanswer");
  const user = db.get(userid);
  console.log("user", user);

  const conversation = getConversation(userid, conversationid);
  console.log("createAnswer", user, conversation);

  conversation.answers.push({
    ...answer,
    id: crypto.randomUUID(),
  });
}

export function deleteConversation(userid: string, conversationid: string) {
  const user = db.get(userid);
  const index = user.conversations.findIndex((conversation: Conversation) =>
    conversation.id === conversationid
  );
  if (index !== -1) {
    user.conversations.splice(index, 1);
  }
}
