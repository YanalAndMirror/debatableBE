const path = require("path");
const { readdirSync, readFileSync } = require("fs");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const resolvers = require("./resolvers");
const modelsDir = path.resolve(process.cwd(), "graphql/typedefs");

const gqlFiles = readdirSync(modelsDir);

let typeDefs = "";

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(path.join(modelsDir, file), {
    encoding: "utf8",
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers, // We added this
});

module.exports = schema;
