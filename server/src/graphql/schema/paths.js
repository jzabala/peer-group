import {
  GraphQLList,
  GraphQLID,
} from 'graphql';
import Path from '../types/path';
import PathDB from '../../models/path';
import { isNotEmpty, getProjectionFromGraphQL } from '../../utils/functions';

const paths = {
  type: new GraphQLList(Path),
  args: {
    url: {
      name: 'url',
      type: GraphQLID,
    },
  },
  resolve(parent, params, context, info) {
    const query = isNotEmpty(params) ? params : {};    
    return PathDB.find(query, getProjectionFromGraphQL(info)).exec();
  },
};

export default paths;
