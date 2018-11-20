import User from "./User";

describe("User Model", () => {
    test("Should not be valid without an email", () => {
      const u = new User({ name: "name", password: "password" });
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });

    test("Should not be valid without a password", () => {
      const u = new User({ name: "name", email: "email" });
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });
});
