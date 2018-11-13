import getResolvers from "./resolvers";

test("exports a Query resolver", () => {
  const resolvers = getResolvers(null);
  expect(resolvers).toHaveProperty("Query");
});
