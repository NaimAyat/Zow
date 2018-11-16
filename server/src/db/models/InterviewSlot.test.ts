import InterviewSlot from "./InterviewSlot";

describe("InterviewSlot Model", () => {
    test("Should not be valid without a start date", () => {
      const u = new InterviewSlot({ end: new Date() });
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });

    test("Should not be valid without an end date", () => {
      const u = new InterviewSlot({ start: new Date() });
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });
});
