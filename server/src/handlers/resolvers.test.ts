import getResolvers from "./resolvers";

test("exports a Query resolver", () => {
  const resolvers = getResolvers(null, null, null);
  expect(resolvers).toHaveProperty("Query");
});
