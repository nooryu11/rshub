const knex = require('knex')({
    client: 'oracledb',
    connection: {
        user: 'dev',
        password: 'rsims301$',
        connectString: `(DESCRIPTION =
            (ADDRESS_LIST =
              (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.0.165)(PORT = 1521))
            )
            (CONNECT_DATA =
              (SERVICE_NAME = orcl)
            )
          )`
    }
});

// const oledb = require('oledb');
// const  db =  oledb.odbcConnection("DSN=RESORTSUITEO8;Pwd=rsims301$");
// console.log( db)
exports.knex = knex;
// exports.db = db;
