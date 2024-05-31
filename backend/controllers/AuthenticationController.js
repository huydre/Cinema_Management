var config = require('../config');
const sql = require('mssql');
const getUserConfig = require('../config');

async function login(email, password) {
    try {
        let pool = await sql.connect(getUserConfig().sql);
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

async function getLoginInfo(data) {
    try {
        // await sql.close();
        let pool = await sql.connect(getUserConfig(data.user, data.password, data.server, data.server).sql);
        let employees = await pool.request()
            .input('TENLOGIN', sql.VarChar, data.user)
            .execute('sp_DangNhap');
        console.log(employees);
        return employees;
    } catch (error) {
        console.log(error);
    }
}

async function checkLogin(data) {
    try {
        await sql.close();
        let pool = await sql.connect(getUserConfig(data.USERNAME, data.PASSWORD, data.SERVERNAME, data.SERVERNAME).sql);
        return pool;
    } catch (error) {
        
    }
}

module.exports = {
    login: login,
    getLoginInfo: getLoginInfo,
    checkLogin: checkLogin,
}