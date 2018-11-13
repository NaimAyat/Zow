import Response from "./Response";
import mongoose from 'mongoose'

describe("Response Model", () => {
    test("Should not be valid without a respondent", () => {
      const u = new Response({ answers: [new mongoose.Types.ObjectId()], scoring: {score: 1, notes: '', user: new mongoose.Types.ObjectId()}});
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });

    test("Should not be valid without a score", () => {
      const u = new Response({respondent: "test@test.com", answers: [new mongoose.Types.ObjectId()], scoring: {notes: '', user: new mongoose.Types.ObjectId()}});
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });

    test("Should not be valid without a user", () => {
      const u = new Response({respondent: "test@test.com", answers: [new mongoose.Types.ObjectId()], scoring: {score:1, notes: ''}});
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });
});

