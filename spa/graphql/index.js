const joinMonsterAdapt = require('join-monster-graphql-tools-adapter');

const { makeExecutableSchema } = require('graphql-tools');



const {folioItemResolvers, folioItemWhereResolvers} = require('../graphql/query');
const {folioItemJMA} = require('../graphql/type');


const folioItemTypeDefs = require('../graphql/typeDefs');
const {gql} = require('apollo-server-express');

const typeDefs = gql`
    scalar Date
    type Query {
        _empty: String
    }

    schema {
        query: Query

    }
`;

const resolvers = {
    Query: {
        ...folioItemResolvers
    },
 
}

const schema = makeExecutableSchema({
    typeDefs: [typeDefs,  ...folioItemTypeDefs],
    resolvers,
});


joinMonsterAdapt(schema, {
    Query: {
        fields: {
            ...folioItemWhereResolvers
        }
    },
    ...folioItemJMA
});



module.exports = schema;