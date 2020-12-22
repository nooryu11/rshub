const {ApolloServer} = require('apollo-server');
const {HttpLink} = require('apollo-link-http');
const {setContext} = require('apollo-link-context');
const dotenv = require('dotenv');
dotenv.config();

const {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas
} = require('graphql-tools');
const fetch = require('node-fetch');
const graphqlApis = require('./microServiceUri.js');

const createRemoteExecutableSchemas = async () => {
  let schemas = [];
  // iterate over all the the GraphQL APIs
  for (let i = 0; i < graphqlApis.length; i++) {
    // Create Apollo link with URI and headers of the GraphQL API
    const link = new HttpLink({
      uri: graphqlApis[i].uri,
      fetch
    });
    // Introspect schema
    const remoteSchema = await introspectSchema(link);
    // Make remote executable schema
    const remoteExecutableSchema = makeRemoteExecutableSchema({
      schema: remoteSchema,
      link
    });
    schemas.push(remoteExecutableSchema);
  }
  return schemas;
};
const createNewSchema = async () => {
  const schemas = await createRemoteExecutableSchemas();
  return mergeSchemas({
    schemas
  });
};
async function startServer() {
  const schema = await createNewSchema();
  // start server with the new schema
  const server = new ApolloServer({
    schema
  });
  server.listen().then(({url}) => {console.log(`Runningk a!t ${url}`);
  });
}

try {
  startServer();
} catch (err) {
  console.error(err);
}
