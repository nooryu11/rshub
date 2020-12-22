const joinMonsterAdapt = require('join-monster-graphql-tools-adapter');

const { makeExecutableSchema,introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools');
const { createHttpLink } =  require('apollo-link-http')
const fetch = require('node-fetch')
const {customerJMA} = require('./type');
const {customerResolvers, customerWhereResolvers} = require('./query');
const {customerMutationResolver} = require('./mutation');
const customerTypeDefs = require('./typeDefs');
const {gql} = require('apollo-server-express');


const typeDefs = gql`

    type Query {
        _empty: String
    }

    type Mutation

    schema {
        query: Query
        mutation: Mutation
    }
`;

const resolvers = {
    Query: {
        ...customerResolvers,
    },
    Mutation: {
        ...customerMutationResolver,
    }
}
const cosmicJsServiceLink = new createHttpLink({
    uri: 'http://spafolio-srv:3000/spafolio',
    fetch
  });
  const createCosmicJsServiceSchema = async () => {  
    const schema = await introspectSchema(cosmicJsServiceLink);

    return makeRemoteExecutableSchema({
      schema,
      cosmicJsServiceLink 
    });
  }


const schema = makeExecutableSchema({
    typeDefs: [typeDefs, ...customerTypeDefs],
    resolvers,
});
// const createNewSchema = async () => {
//     const spafolioSchema = await createCosmicJsServiceSchema();
//     const schemas = []
//     schemas.push(schema)
//     schemas.push(spafolioSchema)
//     return mergeSchemas({
//       schemas
//     });
//   };

// var finalSchema = await createNewSchema()
joinMonsterAdapt(schema, {
    Query: {
        fields: {
            ...customerWhereResolvers,
        }
    },
    ...customerJMA,
});


module.exports = schema