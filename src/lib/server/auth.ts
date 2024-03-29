// src/lib/server/auth.ts
import { Lucia } from "lucia";
import { dev } from "$app/environment";

import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";

import { db } from "@vercel/postgres";
import type { DatabaseUser } from "./database";

const adapter = new PostgresJsAdapter(db, {
  user: "auth_user",
  session: "user_session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}
