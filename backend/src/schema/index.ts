// --- src/schema/index.ts ---
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

const typesArray = loadFilesSync(path.join(__dirname, '../modules/**/schema.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '../modules/**/resolvers/*.ts'));

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesArray),
  resolvers: resolversArray,
});