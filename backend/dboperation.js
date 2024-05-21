var config = require('./config');
const sql = require('mssql');

async function getEmployee() {
    try {
        let pool = await sql.connect(config.sql);
        let employees = await pool.request().execute('GetAllEmployees');
        return employees.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getEmployee: getEmployee
}