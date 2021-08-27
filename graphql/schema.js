const { join } = require("path");
const { readdirSync, readFileSync } = require("fs");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const resolvers = require("./resolvers");

const gqlFiles = readdirSync(join(__dirname, "./typeDefs"));

let typeDefs = "";

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, "./typeDefs", file), {
    encoding: "utf8",
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers, // We added this
});

module.exports = schema;
