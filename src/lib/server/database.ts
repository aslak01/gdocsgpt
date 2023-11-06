import type { Answer, Conversation } from "$lib/types";
// import { db as pdb } from "@vercel/postgres";
import { seed } from "./seed";

// const client = await pdb.connect();
const db = new Map();

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
