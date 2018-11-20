import Form from "./Form";
import mongoose from 'mongoose'

describe("Form Model", () => {
    test("Should not be valid without owners", () => {
      const u = new Form({ questions: [new mongoose.Types.ObjectId()]});
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });

    test("Should not be valid without questions", () => {
      const u = new Form({ owners: [new mongoose.Types.ObjectId()]});
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });
});
