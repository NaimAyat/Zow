import { IAnswer, IQuestion, IResponse, QuestionType } from "./DataTypes";

const getWord = () => {
  const words = [
    "Is this a question?",
    "Mushroom",
    "A word",
    "Rocky Road",
    "Eggs",
    "This is a sentence.",
    "Sample input",
    "Another word"
  ];
  return words[Math.floor(Math.random() * words.length)];
};

const getScore = () => {
  const gpas = ["2", "3", "4", "5"];
  return gpas[Math.floor(Math.random() * gpas.length)];
};

const questionStrings = [
  "Name",
  "Phone",
  "Email",
  "Favorite Color",
  "Tell me a bit about yourself.",
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
  type: (questionString === "Email"
    ? "email"
    : questionString === "Phone"
    ? "phone"
    : questionString === "Tell me a bit about yourself."
    ? "longText"
    : "shortText") as QuestionType
}));
questions.push({
  options: ["One answer", "1-way street", "I won!"],
  prompt: "You may select only one.",
  type: "radio"
});

questions.push({
  options: ["Alabama", "California", "Utah", "Maine", "this.state"],
  prompt: "Which state is the best state?",
  type: "dropdown"
});

questions.push({
  options: ["You can pick me", "And me", "And also me", "Pick all of us!"],
  prompt: "Select multiple of these options.",
  type: "checkbox"
});

const getAnswers: () => IAnswer[] = () => {
  return questions.map(question => ({
    answer: getWord()
    // question: { prompt: question, type: getType() }
  }));
};

const responses: IResponse[] = emails.map(email => ({
  answers: getAnswers(),
  email
}));

export default {
  questions,
  responses,
  scores: emails.map(email => ({ email, score: getScore() }))
};
