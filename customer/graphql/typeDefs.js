const {customerQueries} = require('./query');
const {customerType} = require('./type');
const {customerMutation}  = require('./mutation');

module.exports = [ customerQueries, customerType, customerMutation ];