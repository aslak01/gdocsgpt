import { SECRET_OPENAI_KEY } from "$env/static/private";

async function queryAi(query: string) {
  console.log("query", query);
  const content = {
    "model": "gpt-3.5-turbo",
    "messages": [{
      "role": "system",
      "content": "You are a helpful assistant",
    }, { "role": "user", "content": query }],
    "temperature": 0,
  };
  const req = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SECRET_OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  };

  const res = await fetch(
    "https://api.openai.com/v1/chat/completions",
    req,
  );
  const data = await res.json();

  return data.choices[0].message.content;
}
