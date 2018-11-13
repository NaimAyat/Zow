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

const getScore = () => {
  const gpas = ["2", "3", "4", "5"];
  return gpas[Math.floor(Math.random() * gpas.length)];
};

const questions = [
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

export default {
  questions: questions.map(question => ({ prompt: question })),
  responses: emails.map(email => ({
    answers: questions.map(question => ({
      answer: getWord(),
      question: { prompt: question }
    })),
    email
  })),
  scores: emails.map(email => ({ email, score: getScore() }))
};
