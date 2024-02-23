// import type { Cookies } from "@sveltejs/kit";
// import * as db from "$lib/server/database.js";
//
// /** @type {import('./$types').PageServerLoad} */
// export function load({ cookies }: { cookies: Cookies }) {
//   let userid = cookies.get("userid");
//
//   if (!userid) {
//     userid = crypto.randomUUID();
//     cookies.set("userid", userid, { path: "/" });
//     db.createUser(userid);
//   }
//   const conversations = db.getUser(userid);
//
//   return { conversations };
// }
//
// export const actions = {
//   default: async (
//     { request, cookies }: { request: Request; cookies: Cookies },
//   ) => {
//     console.log("REQ", request, "COOKS", cookies);
//     const userid = cookies.get("userid");
//     if (!userid) return;
//     db.createConversation(userid);
//   },
// };

import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    return redirect(302, "/login");
  }
  return {
    user: event.locals.user,
  };
};

export const actions: Actions = {
  default: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
    return redirect(302, "/login");
  },
};
