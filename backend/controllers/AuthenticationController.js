var config = require('../config');
const sql = require('mssql');

async function login(email, password) {
    try {
        let pool = await sql.connect(config.sql);
        let employee = await pool.request()
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .execute('LoginEmployee');
            if (employee.recordset.length !== 0) {
                return { status: 'success', data: employee.recordsets[0] }
            } else {
                return { status: 'error', message: 'Invalid email or password' }
            }
    } catch (error) {
        return { status: 'error', message: error.originalError.info.message };
    }
}

module.exports = {
    login: login
}