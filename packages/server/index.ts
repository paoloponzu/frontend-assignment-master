import * as fs from "fs";
import { ApolloServer, gql } from "apollo-server";

import { resolvers } from "./resolvers";

const schema = fs.readFileSync("schema.graphql", "utf8");

const typeDefs = gql(schema);

const server = new ApolloServer({
  cors: {
    origin: '*',
    credentials: true
  },
  typeDefs,
  resolvers
});

server.listen({ port: 3001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
