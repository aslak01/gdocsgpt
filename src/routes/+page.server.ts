import { type Cookies, fail } from "@sveltejs/kit";
import * as db from "$lib/server/database.js";
import { queryAi } from "./queryAi";

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }: { cookies: Cookies }) {
  const id = cookies.get("userid");

  if (!id) {
    cookies.set("userid", crypto.randomUUID(), { path: "/" });
  }

  return {
    answers: db.getAnswers(id || "") ?? [],
  };
}

function logError(error: any): string {
  return error && typeof error.message === "string"
    ? error.message
    : String(error);
}

export const actions = {
  default: async (
    { request, cookies }: { request: Request; cookies: Cookies },
  ) => {
    if (!cookies.get("userid")) return;
    await new Promise((fulfil) => setTimeout(fulfil, 1000));
    const data = await request.formData();
    if (!data.get("description")) return;
    const query = data.get("description") || "";
    console.log("entered", query);
    if (typeof query !== "string") return;
    // const answer = await queryAi(query);
    const answer = "got an answer";
    if (typeof answer !== "string") return;
    console.log(answer);

    try {
      db.createAnswer(
        cookies.get("userid") || "",
        { query, answer },
      );
    } catch (error) {
      return fail(422, {
        description: data.get("request"),
        error: logError(error),
      });
    }
  },
};
