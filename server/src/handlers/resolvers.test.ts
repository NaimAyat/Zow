import resolvers from "./resolvers";

// Example resolver tests

test("hello resolver", () => {
  expect(resolvers.Query.hello()).toBe("Hello, world!");
});

test("time resolver", () => {
  expect(resolvers.Query.time()).toBeLessThanOrEqual(
    Math.floor(new Date().getTime() / 1000)
  );
});
