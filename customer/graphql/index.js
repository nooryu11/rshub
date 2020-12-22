const joinMonsterAdapt = require('join-monster-graphql-tools-adapter');

const { makeExecutableSchema } = require('graphql-tools');

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

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, ...customerTypeDefs],
    resolvers,
});


joinMonsterAdapt(schema, {
    Query: {
        fields: {
            ...customerWhereResolvers,
        }
    },
    ...customerJMA,
});


module.exports = schema