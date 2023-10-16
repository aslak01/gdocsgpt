import { type Actions, type Cookies, fail } from "@sveltejs/kit";
import * as db from "$lib/server/database.js";
import { faker } from "@faker-js/faker";
import { queryAi } from "$lib/utils/queryAi";
import { logError } from "$lib/utils/utils";
import type { PageServerLoad } from "../$types";

function isStr(str: unknown) {
  return typeof str !== "undefined" && typeof str === "string";
}
const isNotStr = (str: unknown) => !isStr(str);

export const load: PageServerLoad = (
  { cookies, params },
) => {
  const userid = cookies.get("userid");
  const convo = params?.convo;
  if (isNotStr(userid) || isNotStr(convo)) return;

  const conversation = db.getConversation(userid, convo);

  return conversation;
};

export const actions: Actions = {
  default: async (
    { request, cookies, params },
  ) => {
    const userid = cookies.get("userid");
    const convoid = params.convo;
    console.log("userid", userid, "convoid", convoid);
    const data = await request.formData();
    const query = data.get("description");
    console.log("query", query);
    if (isNotStr(userid) || isNotStr(convoid) || isNotStr(query)) return;
    // const answer = await queryAi(query);
    const answer = faker.lorem.paragraphs({ min: 1, max: 5 }, "<br />");
    if (isNotStr(answer)) return;
    console.log("answer", answer);

    try {
      db.createAnswer(
        userid,
        convoid,
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
