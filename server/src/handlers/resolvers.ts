// Example resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    time: () => Math.floor(new Date().getTime() / 1000)
  }
};

export default resolvers;
