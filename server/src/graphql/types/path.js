import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';

import Milestone from './milestone';

const Path = new GraphQLObjectType({
  name: 'Path',
  fields: {
    url: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    milestones: {
      type: new GraphQLList(Milestone),
    },
  },
});

export default Path;
