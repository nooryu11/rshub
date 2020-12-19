"use strict";
// const knex = require('knex')({
//     client: 'oracledb',
//     connection: {
//         user: 'dev',
//         password: 'rsims301$',
//         connectString: `(DESCRIPTION =
//             (ADDRESS_LIST =
//               (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.0.165)(PORT = 1521))
//             )
//             (CONNECT_DATA =
//               (SERVICE_NAME = orcl)
//             )
//           )`
//     }
// });
exports.__esModule = true;
exports.odbcConnection = void 0;
var oledb = require('oledb');
var odbcConnection = oledb.odbcConnection("DSN=RESORTSUITEO8;Pwd=rsims301$");
exports.odbcConnection = odbcConnection;
