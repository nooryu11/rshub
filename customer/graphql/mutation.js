const {db} = require('../src/db');

exports.customerMutation = `
    extend type Mutation {
        updateCustomer(address: String!, id: String!): Customer
    }
`;

exports.customerMutationResolver = {
    updateCustomer(parent, {address, id}, ctx, resolveInfo) {
        return new Promise(resolve => {
            db.execute(
                "UPDATE ALL_CUSTOMER SET ADDRESS = ? WHERE ALL_CUSTOMER_ID = ?",
                [ address, id ]
            )
            .then(async (e) => {
                console.log('ii-i', e);
                let res = await db.query('select * from ALL_CUSTOMER where ALL_CUSTOMER_ID = ?',[id]);
                resolve(res.result[0][0]);
            })
            .catch(err => { console.log(err) })
        })
    }
}