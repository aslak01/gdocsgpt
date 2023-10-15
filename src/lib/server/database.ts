import type { Answer, Conversation } from "$lib/types";
const db = new Map();

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
  const user = db.get(userid);
  if (!user) {
    return;
  }
  const conversation = user.findIndex((conversation: Conversation) =>
    conversation.id === conversationid
  );
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
  if (answer.query === "") {
    throw new Error("query must exist");
  }
  const user = db.get(userid);
  const conversation = user.getConversation(conversationid);
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
