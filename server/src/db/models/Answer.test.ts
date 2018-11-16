import Answer from "./Answer";
const mongoose = require('mongoose')

describe("Answer Model", () => {
    test("Should not be valid without a question", () => {
      const u = new Answer({ value: "v" });
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });

    test("Should not be valid without a value", () => {
      const u = new Answer({ question: new mongoose.Types.ObjectId()});
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });
});
