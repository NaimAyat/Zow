import Question from "./Question";

describe("Question Model", () => {
    test("Should not be valid without a prompt", () => {
      const u = new Question({ type: "CHECKBOX"});
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });

    test("Should not be valid without a question type from the enum", () => {
      const u = new Question({ prompt: "test", type: "test" });
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });
});
