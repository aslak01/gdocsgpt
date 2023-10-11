const db = new Map();

type Answer = {
  query: string;
  answer: string;
  id: string;
};

export function getAnswers(userid: string) {
  if (!db.get(userid)) {
    db.set(userid, [{
      id: crypto.randomUUID(),
      query: "Test",
      answer: "Not a real answer",
    }]);
  }

  return db.get(userid);
}

export function createAnswer(userid: string, answer: Omit<Answer, "id">) {
  if (answer.query === "") {
    throw new Error("query must exist");
  }

  const answers = db.get(userid);

  answers.push({
    ...answer,
    id: crypto.randomUUID(),
  });
}

export function deleteAnswer(userid: string, answerid: string) {
  const answers = db.get(userid);
  const index = answers.findIndex((answer: Answer) => answer.id === answerid);

  if (index !== -1) {
    answers.splice(index, 1);
  }
}
