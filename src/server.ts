import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { context } from "./context";

const server = new ApolloServer({
  schema: schema,
  context: context,
});

server.listen().then(({ url }) =>
  console.log(
    `\
  🚀 Server ready at: ${url}
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#using-the-graphql-api`
  )
);
