import User from "./User";

describe("Database Models", () => {
  describe("User model", () => {
    test("Should not be valid without an email", () => {
      const u = new User({ name: "name", password: "password" });
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });
  });
});
