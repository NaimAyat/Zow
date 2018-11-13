import resolvers from "./resolvers";

test("exports a Query resolver", () => {
  expect(resolvers).toHaveProperty("Query");
});
