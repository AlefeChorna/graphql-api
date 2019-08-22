import { makeExecutableSchema } from 'graphql-tools';

const users: any[] = [
  {
    id: 1,
    name: 'Aléfe Chorna',
    email: 'alefe@gmail.com'
  }, {
    id: 2,
    name: 'Juca Bala',
    email: 'juca@hotmail.com'
  }
];

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

const resolvers = {
  User: { // Resolver trivial
    id: (parent) => String(parent.id).padStart(6, '0'),
  },
  Query: {
    allUsers: () => users
  },
  Mutation: {
    createUser: (parent, args) => {
      const newUser = Object.assign({
        id: users.length + 1
      }, args);

      users.push(newUser);

      return newUser;
    }
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
