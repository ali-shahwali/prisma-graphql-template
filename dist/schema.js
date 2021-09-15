"use strict";
exports.__esModule = true;
exports.schema = void 0;
var nexus_1 = require("nexus");
var Query = (0, nexus_1.objectType)({
    name: "Query",
    definition: function (t) {
        t.nonNull.list.nonNull.field("allToDos", {
            type: "ToDo",
            resolve: function (_parent, _args, context) {
                return context.prisma.toDos.findMany();
            }
        });
    }
});
var Mutation = (0, nexus_1.objectType)({
    name: "Mutation",
    definition: function (t) {
        t.nonNull.field("addToDo", {
            type: "ToDo",
            args: {
                data: (0, nexus_1.nonNull)((0, nexus_1.arg)({
                    type: "ToDoCreateInput"
                }))
            },
            resolve: function (_parent, args, context) {
                return context.prisma.toDos.create({
                    data: {
                        description: args.data.description,
                        title: args.data.title
                    }
                });
            }
        });
        t.nonNull.field("updateToDo", {
            type: "ToDo",
            args: {
                id: (0, nexus_1.intArg)(),
                completed: (0, nexus_1.booleanArg)()
            },
            resolve: function (_parent, args, context) {
                return context.prisma.toDos.update({
                    where: { id: args.id || undefined },
                    data: {
                        completed: args.completed || undefined
                    }
                });
            }
        });
    }
});
var ToDo = (0, nexus_1.objectType)({
    name: "ToDo",
    definition: function (t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("description");
        t.nonNull.boolean("completed");
    }
});
var ToDoCreateInput = (0, nexus_1.inputObjectType)({
    name: "ToDoCreateInput",
    definition: function (t) {
        t.nonNull.string("title");
        t.nonNull.string("description");
    }
});
exports.schema = (0, nexus_1.makeSchema)({
    types: [Query, Mutation, ToDo, ToDoCreateInput],
    outputs: {
        schema: __dirname + "/../schema.graphql",
        typegen: __dirname + "/generated/nexus.ts"
    },
    contextType: {
        module: require.resolve("./context"),
        "export": "Context"
    },
    sourceTypes: {
        modules: [
            {
                module: "@prisma/client",
                alias: "prisma"
            },
        ]
    }
});
//# sourceMappingURL=schema.js.map