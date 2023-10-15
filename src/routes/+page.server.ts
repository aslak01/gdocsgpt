import type { Cookies } from "@sveltejs/kit";
import * as db from "$lib/server/database.js";

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }: { cookies: Cookies }) {
  let userid = cookies.get("userid");

  if (!userid) {
    userid = crypto.randomUUID();
    cookies.set("userid", userid, { path: "/" });
    db.createUser(userid);
  }
  const conversations = db.getUser(userid);

  return { conversations };
}

export const actions = {
  default: async (
    { request, cookies }: { request: Request; cookies: Cookies },
  ) => {
    console.log("REQ", request, "COOKS", cookies);
    const userid = cookies.get("userid");
    if (!userid) return;
    db.createConversation(userid);
  },
};
