import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { pg } from "@lucia-auth/adapter-postgresql";
import { db } from "@vercel/postgres";

type VercelPostgresError = {
  code: string;
  detail: string;
  schema?: string;
  table?: string;
  column?: string;
  dataType?: string;
  constraint?: "auth_user_username_key";
};

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),

  adapter: pg(db, {
    // table names
  }),
  getUserAttributes: (data) => {
    return {
      name: data.name,
    };
  },
  // ...
});

export type Auth = typeof auth;
