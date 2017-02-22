import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import paths from './paths';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      paths,
    },
  }),
});

export default schema;
