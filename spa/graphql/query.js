const joinMonster = require('join-monster');
const {knex} = require('../src/db');

exports.folioItemQueries = `
extend type Query {
    SpaFolio(ALL_CUSTOMER_ID: ID!): [spafolio]!
}
`;

exports.folioItemResolvers = {
    SpaFolio(parent, args, ctx, resolveInfo) {
        return joinMonster.default(resolveInfo,ctx, sql=>{
            return knex.raw(sql);
        });
    }
}

exports.folioItemWhereResolvers = {}