import { IAnswer, IQuestion, IResponse, QuestionType } from "./DataTypes";

const getWord = () => {
  const words = [
    "Kook",
    "Mushroom",
    "Potato",
    "Rocky Road",
    "Eggs",
    "Sammy",
    "Cocoa",
    "Crisps"
  ];
  return words[Math.floor(Math.random() * words.length)];
};

const getType = () => {
  const words: QuestionType[] = ["radio", "longText", "shortText"];
  return words[Math.floor(Math.random() * words.length)];
};

const getScore = () => {
  const gpas = ["2", "3", "4", "5"];
  return gpas[Math.floor(Math.random() * gpas.length)];
};

const questionStrings = [
  "Name",
  "GPA",
  "Email",
  "Favorite Color",
  "Category",
  "Favorite Icecream"
];

const emails = [
  "caziz@ucla.edu",
  "chancellor@ucla.edu",
  "muffins@education.edu",
  "butter@butt.er",
  "hello@good.bye",
  "okay@not.okay"
];

const questions: IQuestion[] = questionStrings.map(questionString => ({
  prompt: questionString,
  type: getType()
}));

const answers: IAnswer[] = questions.map(question => ({
  answer: getWord()
  // question: { prompt: question, type: getType() }
}));

const responses: IResponse[] = emails.map(email => ({
  answers,
  email
}));

export default {
  questions,
  responses,
  scores: emails.map(email => ({ email, score: getScore() }))
};
