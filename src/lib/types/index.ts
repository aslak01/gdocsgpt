export type Answer = {
  query: string;
  answer: string;
  id: string;
};

export type Conversation = {
  answers: Answer[];
  id: string;
};
