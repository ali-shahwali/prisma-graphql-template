import {
  makeSchema,
  objectType,
  intArg,
  stringArg,
  booleanArg,
  nonNull,
  inputObjectType,
  arg,
} from "nexus";

const Query = objectType({
  name: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allToDos", {
      type: "ToDo",
      resolve: (_parent, _args, context) => {
        return context.prisma.toDos.findMany();
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.nonNull.field("addToDo", {
      type: "ToDo",
      args: {
        data: nonNull(
          arg({
            type: "ToDoCreateInput",
          })
        ),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.toDos.create({
          data: {
            description: args.data.description,
            title: args.data.title,
          },
        });
      },
    });

    t.nonNull.field("updateToDo", {
      type: "ToDo",
      args: {
        id: intArg(),
        completed: booleanArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.toDos.update({
          where: { id: args.id || undefined },
          data: {
            completed: args.completed || undefined,
          },
        });
      },
    });
  },
});

const ToDo = objectType({
  name: "ToDo",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.boolean("completed");
  },
});

const ToDoCreateInput = inputObjectType({
  name: "ToDoCreateInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, ToDo, ToDoCreateInput],
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});
