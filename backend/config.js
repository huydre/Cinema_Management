'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const { PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER } = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = function getUserConfig(user = SQL_USER, password = SQL_PASSWORD, instanceName = 'DESKTOP-ENIOI3O\\CINEMA_N19', server = SQL_SERVER) {
    return {
        port: PORT,
        host: HOST,
        url: HOST_URL,
        sql: {
            server: server,
            database: SQL_DATABASE,
            user: user,
            password: password,
            options: {
                encrypt: sqlEncrypt,
                enableArithAbort: true,
                instancename: instanceName
            },
            port: 1433
        }
    }
}