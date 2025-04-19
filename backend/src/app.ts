// // --- src/app.ts ---
// import dotenv from 'dotenv';
// dotenv.config();

// import { ApolloServer } from 'apollo-server';
// import { schema } from './schema';
// import { context } from './config/context';
// import { formatError } from './errorHandler';
// const server = new ApolloServer({
//   schema,
//   context,
//   formatError,
//   introspection: true,

// });

// export default server;

// --- src/app.ts ---
import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
// @ts-ignore
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'; // ✅ proper ESM import

import { schema } from './schema';
import { context } from './config/context';
import { formatError } from './errorHandler';
;

const app: Application = express();

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 1 }));

const apolloServer = new ApolloServer({
  schema,
  context,
  formatError,
  introspection: true,
});

async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app as any });
}

startServer();

export default app;
