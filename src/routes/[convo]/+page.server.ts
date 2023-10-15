import { type Cookies, fail } from "@sveltejs/kit";
import * as db from "$lib/server/database.js";
import { queryAi } from "$lib/utils/queryAi";
import { logError } from "$lib/utils/utils";
import type { PageServerLoad } from "../$types";

export function load(
  { cookies, params }: { cookies: Cookies; params: PageServerLoad["params"] },
) {
  const userid = cookies.get("userid");
  if (!userid) return;
  const convoid = params.convo;

  const conversation = db.getConversation(userid, convoid);

  return conversation;
}

export const actions = {
  default: async (
    { request, cookies }: { request: Request; cookies: Cookies },
  ) => {
    if (!cookies.get("userid")) return;
    // await new Promise((fulfil) => setTimeout(fulfil, 1000));
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
