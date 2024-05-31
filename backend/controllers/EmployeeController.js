var config = require('../config');
const sql = require('mssql');
const getUserConfig = require('../config');

async function getEmployee(data) {
    try {
        let pool = await sql.connect(getUserConfig(data.user, data.password, data.server, data.server).sql);
        console.log(pool);
        let employees = await pool.request().execute('GetAllEmployees');
        return employees.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getEmployeeById(id) {
    try {
        let pool = await sql.connect(config.sql);
        let employee = await pool.request()
            .input('uid', sql.VarChar, id)
            .execute('GetEmployeeById');
            if (employee.recordset.length !== 0) {
                return { status: 'success', data: employee.recordsets[0] }
            } else {
                return { status: 'error', message: 'No employee found' }
            }
    } catch (error) {
        return { status: 'error', message: error.originalError.info.message };
    }
}

async function insertEmployee(employee) {
    try {
        let pool = await sql.connect(config.sql);
        let insertEmployee = await pool.request()
            .input('uid', sql.VarChar, employee.uid)
            .input('fullname', sql.NVarChar, employee.fullname)
            .input('email', sql.VarChar, employee.email)
            .input('phone', sql.VarChar, employee.phone)
            .input('password', sql.VarChar, employee.password)
            .input('role', sql.VarChar, employee.role)
            .input('cinemaId', sql.VarChar, employee.cinemaId)
            .execute('InsertEmployee');
            return { status: 'success', data: insertEmployee.recordsets };
    }
    catch (err) {
        return { status: 'error', message: err.originalError.info.message };
    }
}

async function updateEmployee(employee) {
    try {
        let pool = await sql.connect(config.sql);
        let updateEmployee = await pool.request()
            .input('uid', sql.VarChar, employee.uid)
            .input('fullname', sql.NVarChar, employee.fullname)
            .input('email', sql.VarChar, employee.email)
            .input('phone', sql.VarChar, employee.phone)
            .input('role', sql.VarChar, employee.role)
            .input('cinemaId', sql.VarChar, employee.cinemaId)
            .execute('UpdateEmployee');
            return { status: 'success', data: updateEmployee.recordsets };
    }
    catch (err) {
        return { status: 'error', message: err.originalError.info.message };
    }
}

async function deleteEmployee(id) {
    try {
        let pool = await sql.connect(config.sql);
        let deleteEmployee = await pool.request()
            .input('uid', sql.VarChar, id)
            .execute('DeleteEmployee');
            return { status: 'success', data: deleteEmployee.recordsets };
    }
    catch (err) {
        return { status: 'error', message: err.originalError.info.message };
    }
}

module.exports = {
    getEmployee: getEmployee,
    getEmployeeById: getEmployeeById,
    insertEmployee: insertEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee
}