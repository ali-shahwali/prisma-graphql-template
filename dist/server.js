"use strict";
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var schema_1 = require("./schema");
var context_1 = require("./context");
var server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    context: context_1.context
});
server.listen().then(function (_a) {
    var url = _a.url;
    return console.log("  \uD83D\uDE80 Server ready at: " + url + "\n  \u2B50\uFE0F See sample queries: http://pris.ly/e/ts/graphql-auth#using-the-graphql-api");
});
//# sourceMappingURL=server.js.map