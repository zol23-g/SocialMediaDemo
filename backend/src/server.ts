// --- src/server.ts ---
// import server from './app';
// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

// --- src/server.ts ---
import app from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
