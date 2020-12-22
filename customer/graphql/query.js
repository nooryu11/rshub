const {knex} = require('../src/db');
const joinMonster = require('join-monster');
const escape = require('pg-escape');

exports.customerQueries = `
    input CustomersInput {
        EMAIL_ADDRESS: String
        NAME: String
        HOME_PHONE: String
        SPA_FOLIO_ID: ID
        ALL_CUSTOMER_ID: ID
    }

    extend type Query {
        customers(input: CustomersInput): [Customer]!
        customer(id:String!): Customer
    }
`;

exports.customerResolvers = {
    customers(parent, args, ctx, resolveInfo) {
        
        return joinMonster.default(resolveInfo,ctx, async sql=>{
            console.log(sql)
            // let a = await knex.raw(sql);
            // console.log(a);
            return knex.raw(sql); 
        });
    },
    customer(parent, args, ctx, resolveInfo) {
        return joinMonster.default(resolveInfo,ctx, sql=>{
            console.log(sql, resolveInfo, ctx)
            return knex.raw(sql);
        });
    },
}

exports.customerWhereResolvers = {
    customers: {
        where: (customerTable,args) => {
            let whereClause = [];
            let escapedVariables = [];
            args = args.input;
            for(let key in args){
                if(args[key]){ 
                    if(key == 'NAME') {
                        whereClause.push(`${customerTable}.UPPER_FIRST_NAME || ' ' || ${customerTable}.UPPER_LAST_NAME || ' ' || ${customerTable}.UPPER_FIRST_NAME like %L`);
                        escapedVariables.push(`%${args.NAME.toUpperCase()}%`);
                    }else if(key=='SPA_FOLIO_ID') {
                        whereClause.push(`${customerTable}.ALL_CUSTOMER_ID = (select ALL_CUSTOMER_ID from SPA_FOLIO where SPA_FOLIO_ID = %L)`);
                        escapedVariables.push(args[key]);
                    }
                    else {
                        whereClause.push(`${customerTable}.${key} = %L`);
                        escapedVariables.push(args[key]);
                    }
                }
            }
            return escape(whereClause.join(' and '), ...escapedVariables);
        },
    },
    customer: {
        where: (customerTable,args) => {
            console.log(args)
            return escape(`${customerTable}.ALL_CUSTOMER_ID = %L`,args.id);
        }
    }
}