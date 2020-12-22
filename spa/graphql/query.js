const joinMonster = require('join-monster');
const {knex} = require('../src/db');

exports.folioItemQueries = `
extend type Query {
    folio(ALL_CUSTOMER_ID: ID!): [spafolio]!
}
`;

exports.folioItemResolvers = {
    folio(parent, args, ctx, resolveInfo) {
        return joinMonster.default(resolveInfo,ctx, sql=>{
            return knex.raw(sql);
        });
    }
}

exports.folioItemWhereResolvers = {}